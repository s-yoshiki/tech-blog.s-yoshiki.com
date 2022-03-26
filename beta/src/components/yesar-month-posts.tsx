import {
  Posts,
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

const Month = ({item, year} : MonthProps) => {
  const month = item
  const key = month.name.split('-')[1]
  return (
    <>
      <div className="ml-8 p-1">
        <Link href={`/date/${year}/${key}`}>
          <div className="hover:underline">{key} ({month.counts})</div>
        </Link>
      </div>
    </>
  )
}

const Year = ({item}: YearProps) => {
  const [open, setFlag] = useState<boolean>(false)
  const year = item
  return (
    <div>
      <div onClick={() => setFlag(!open)} className="flex flex-wrap p-1">
        <div className="pr-3">
          {open ? '▼' : '▶︎' }
        </div>
        <Link href={`/date/${year.name}`}>
          <div className="hover:underline">
            {year.name} ({year.counts})
          </div>
        </Link>
      </div>
      {open && (
        <div>
            {year.months.map(month => {
              return (
                <Month item={month} year={year.name}/>
              )
            })} 
        </div>
      )}
    </div>
  )
}

const YearMonthPosts = ({items}: YearMonthPostsProps) => {
  return (
    <div>
      {items.map(year => <Year item={year} />)}
    </div>
  )
}

export default YearMonthPosts