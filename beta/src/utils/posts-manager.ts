import fs from 'fs'
import { join } from "path";
import matter from "gray-matter";
import {
  Posts,
  IGroupByItems,
  IGroupByYearMonthItems
} from "types/entry.interface"

// postsが格納されているディレクトリを取得する
const postsDirectory = join(process.cwd(), "../content/posts");

const listFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(dirent =>
    dirent.isFile() ? [`${dir}/${dirent.name}`] : listFiles(`${dir}/${dirent.name}`)
  )

const getCoverImage = (src: string) => '/images/thumbnail/' + src.split('/').pop() 

const getYearMonthKey = (src: string): string => {
  const date = new Date(src)
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0')
  ].join('-')
}

const getPopularPostsKeys = () => {
  return [
    // Proxy
    '/entry/177',
    // OpenCV Mat
    '/entry/76',
    // Mac SQL client
    '/entry/180',
    // tableplus
    '/entry/59',
    // DBeaver
    '/entry/233',
    // AWS S3 アクセスキー
    '/entry/135',
    // AtCoder茶色
    '/entry/74',
    // CentOS8でEPELとPowerTools
    '/entry/206',
    // ポートスキャン
    '/entry/84',
    // opencv fill convex polly
    '/entry/78',
    // centos7 perl
    '/entry/169',
    // php5 to php7
    '/entry/210',
  ]
} 

class PostsManager {
  /**
   * 付属情報格納
   */
  private data: Array<Posts>
  
  /**
   * タグごとにソートした記事
   */
  private dataGroupByTag: Map<string, Posts[]>;
  // 利用しているタグ名
  private tagNames:  string[] = []
  /**
   * 年月ごとソート
   */
  private dataGroupByYearMonth: Map<string, Posts[]>;
  private yearMonths : string[] = []
  /**
   * 年ごとソート
   */
  private dataGroupByYear: Map<string, Posts[]>;
  private years : string[] = []
  private mostOldDate : number = new Date().getFullYear()

  /**
   * 
   * @param basePath 
   */
  constructor(basePath: string) {
    const files = listFiles(basePath)
    const result = []
    for (let i = 0; i < files.length; i++) {
      if (!files[i].endsWith("/index.md")) {
        continue
      }
      const fileContents = fs.readFileSync(files[i], "utf8");
      const { data } = matter(fileContents);
      data.filepath = files[i]
      result.push(<Posts>data)
    }
    const dataGroupByTag = new Map<string, Posts[]>()
    const dataGroupByYearMonth = new Map<string, Posts[]>()
    const dataGroupByYear = new Map<string, Posts[]>()
    this.data = result.map(post => {
      //
      // 画像パス修正
      //
      post.coverImage = getCoverImage(post.coverImage)
      //
      // tag集計
      //
      post.tags = Array.from(new Set(post.tags))
      this.tagNames = Array.from(new Set(this.tagNames.concat(post.tags)))
      post.tags.forEach(tag => {
        let tmp = dataGroupByTag.get(tag)
        if (!tmp) {
          tmp = []
        }
        tmp.unshift(post)
        dataGroupByTag.set(tag, tmp)
      })
      //
      // 年月集計
      //
      const yearMonthKey: string = getYearMonthKey(post.date)
      const yearKey = new Date(post.date).getFullYear().toString()
      //年月
      let tmp = dataGroupByYearMonth.get(yearMonthKey)
      if (!tmp) {
        tmp = []
      }
      tmp.push(post)
      dataGroupByYearMonth.set(yearMonthKey, tmp)
      //年
      tmp = dataGroupByYear.get(yearKey)
      if (!tmp) {
        tmp = []
      }
      tmp.push(post)
      dataGroupByYear.set(yearKey, tmp)
      if (this.mostOldDate > Number(yearKey)) {
        this.mostOldDate = Number(yearKey)
      }
      return post
    })
    this.dataGroupByTag = dataGroupByTag
    this.dataGroupByYearMonth = dataGroupByYearMonth
    this.dataGroupByYear = dataGroupByYear
    // path:/entry/${id} でソート
    this.data = this.data.sort((a: Posts, b: Posts): number => {
      let ai = Number(a.path.split('/').pop())
      let bi = Number(b.path.split('/').pop())
      return bi - ai
    })
  }

  /**
   * 
   * @returns 
   */
  public getData() {
    return this.data
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  public findByPath(path: string): Posts {
    const data = this.data
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      if (path === row.path) {
        return row
      }
    }
    return {
      title: "",
      path: "",
      date: "",
      coverImage: "",
      tags: [],
      filepath: "",
    }
  }

  /**
   * タグで一覧検索
   * @param tag 
   * @returns 
   */
  public findByTag(tag: string): Posts[] {
    const data = this.getAllGroupByTags().get(tag)
    if (!data) {
      return []
    }
    return  data
  }

  /**
   * tagでソートして取得
   * @returns 
   */
  public getAllGroupByTags(): Map<string, Posts[]> {
    return this.dataGroupByTag
  }

  /**
   * tagでソートして取得
   * @returns 
   */
  public getCountsGroupByTags(sort: 'desc' | 'asc' = 'desc'): IGroupByItems[] {
    const tagNames = this.getAllTagNames()
    const tagsCounts = []
    for (let i = 0; i < tagNames.length; i++) {
      const tag = tagNames[i]
      tagsCounts.push({
        name: tag,
        counts: this.findByTag(tag).length
      })
    }
    return tagsCounts.sort((prev, next) => {
      if (sort === 'asc') {
        return prev.counts - next.counts
      }
      return next.counts - prev.counts
    })
  }

  /**
   * 
   * @returns 
   */
  public getAllTagNames(): string[] {
    return this.tagNames
  }

  /**
   * 
   * @param year 
   * @param month 
   * @returns 
   */
  public findByYearMonth(
    year: string | number,
    month: string | number
  ): Posts[] {
    year = String(year)
    month = String(Number(month)).padStart(2, '0')
    const result = this.dataGroupByYearMonth.get(`${year}-${month}`)
    if (!result) {
      return []
    }
    return result
  }

  /**
   * 
   * @param year 
   * @returns 
   */
  public findByYear(year: string | number): Posts[] {
    year = String(year)
    const result = this.dataGroupByYear.get(year)
    if (!result) {
      return []
    }
    return result
  }

  /**
   * 
   * @param sort 
   * @returns 
   */
  public getCountsGroupYearMonth(): IGroupByYearMonthItems[] {
    const startYear = this.getPostsStartYear()
    const dates: IGroupByYearMonthItems[] = []
    for (let year = startYear; year <= new Date().getFullYear(); year++) {
      const months: IGroupByItems[] = []
      for (let month = 1; month <= 12; month++) {
        const posts = this.findByYearMonth(year, month)
        if (posts.length > 0) {
          months.unshift({
            name: `${year}-${String(month).padStart(2, '0')}`,
            counts: posts.length
          })
        }
      }
      dates.unshift({
        name: String(year),
        counts: this.findByYear(year).length,
        months,
      })
    }
    return dates
  }

  public getAllGroupByYear() {
    return this.dataGroupByYear
  }
  public getAllGroupByYearMonth() {
    return this.dataGroupByYearMonth
  }
  public getPostsStartYear() {
    return this.mostOldDate
  }
  public getPopularPosts() {
    const keys = getPopularPostsKeys()
    const posts = []
    for (let idx in keys) {
      const post = this.findByPath(keys[idx])
      posts.push(post)
    }
    return posts
  }
  public getRecommendsPosts(tags: string[], maxCount = 12): Posts[] {
    const data = this.getData()
    let tmpList: any = []
    for (let i = 0; i < data.length; i++) {
      const post = data[i]
      let point = 0
      for (let j = 0; j < tags.length; j++) {
        const tag = tags[j]
        if (post.tags.includes(tag)) {
          point++
        }
      }
      if (point === 0) {
        continue
      }
      tmpList.push({
        post,
        point
      })
      tmpList = tmpList.sort((a: any, b: any) => b.point - a.point).slice(0, maxCount)
    }
    return tmpList.map((e: any)  => e.post)
  }
}

export default new PostsManager(postsDirectory)