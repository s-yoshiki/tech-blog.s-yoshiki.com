'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type {
  IGroupByItems,
  IGroupByYearMonthItems,
} from 'types/entry.interface';

interface YearMonthPostsProps {
  items: IGroupByYearMonthItems[];
}
interface MonthProps {
  item: IGroupByItems;
  year: string;
}
interface YearProps {
  item: IGroupByYearMonthItems;
  defaultOpen?: boolean;
}

const Count = ({ value }: { value: number }) => (
  <span className="ml-auto text-muted-foreground text-xs tabular-nums">
    {value}
  </span>
);

const Month = ({ item, year }: MonthProps) => {
  const key = item.name.split('-')[1];
  return (
    <li>
      <Link
        href={`/date/${year}/${key}`}
        className="flex items-center gap-2 rounded-md py-1.5 pr-2 pl-9 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
      >
        {Number(key)}月
        <Count value={item.counts} />
      </Link>
    </li>
  );
};

const Year = ({ item, defaultOpen = false }: YearProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `archive-${item.name}`;

  return (
    <li>
      <div className="flex items-center">
        {/* Was a <div onClick>: not focusable, not keyboard operable, and with
            no state exposed to assistive technology. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.name}年の月別内訳を${open ? '閉じる' : '開く'}`}
          className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight
            aria-hidden="true"
            className={`size-4 transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </button>
        <Link
          href={`/date/${item.name}`}
          className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 font-medium text-sm transition-colors hover:bg-muted"
        >
          {item.name} 年
          <Count value={item.counts} />
        </Link>
      </div>
      {open && (
        <ul id={panelId} className="mt-0.5 space-y-0.5">
          {item.months.map((month) => (
            <Month item={month} year={item.name} key={month.name} />
          ))}
        </ul>
      )}
    </li>
  );
};

const YearMonthPosts = ({ items }: YearMonthPostsProps) => (
  <ul className="space-y-0.5">
    {items.map((year, index) => (
      <Year item={year} key={year.name} defaultOpen={index === 0} />
    ))}
  </ul>
);

export default YearMonthPosts;
