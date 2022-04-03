import {
  IGroupByItems,
  IGroupByYearMonthItems
} from "types/entry.interface"
import { useState } from 'react';
import Link from 'next/link'

interface YearMonthPostsProps {
  items: IGroupByYearMonthItems[]
}
interface MonthProps {
  item: IGroupByItems;
  year: string;
}
interface YearProps {
  item: IGroupByYearMonthItems
}

const Month = ({ item, year }: MonthProps) => {
  const month = item
  const key = month.name.split('-')[1]
  return (
    <>
      <div className="ml-6 p-1">
        <Link href={`/date/${year}/${key}`} passHref>
          <div className="hover:underline">{Number(key)}月 ({month.counts})</div>
        </Link>
      </div>
    </>
  )
}

const Year = ({ item }: YearProps) => {
  const [open, setFlag] = useState<boolean>(false)
  const year = item
  return (
    <div>
      <div onClick={() => setFlag(!open)} className="flex flex-wrap p-1">
        <div className="pr-2">
          {open ? '▼' : '▶︎'}
        </div>
        <Link href={`/date/${year.name}`} passHref>
          <div className="hover:underline">
            {year.name} 年 ({year.counts})
          </div>
        </Link>
      </div>
      {open && (
        <div>
          {year.months.map((month, idx) => {
            return (
              <Month item={month} year={year.name} key={idx} />
            )
          })}
        </div>
      )}
    </div>
  )
}

const YearMonthPosts = ({ items }: YearMonthPostsProps) => {
  return (
    <div>
      {items.map((year, idx) => <Year item={year} key={idx} />)}
    </div>
  )
}

export default YearMonthPosts