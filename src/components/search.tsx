'use client';

import { Button } from 'components/ui/button';
import { search as navigateToSearch } from 'lib/inner-search';
import { cn } from 'lib/utils';
import { Search as SearchIcon } from 'lucide-react';
import { useId, useState } from 'react';

interface SearchProps {
  onSearch?: (arg: string) => void;
  /** `hero` is the large landing-page field, `compact` the one in the header */
  variant?: 'hero' | 'compact';
  className?: string;
}

const Search = ({ onSearch, variant = 'hero', className }: SearchProps) => {
  const [value, setValue] = useState('');
  const inputId = useId();
  const isHero = variant === 'hero';

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (query) (onSearch ?? navigateToSearch)(query);
  };

  return (
    <search
      id={isHero ? 'search' : undefined}
      className={cn('block w-full', className)}
    >
      <form onSubmit={submit} className="relative w-full">
        <label htmlFor={inputId} className="sr-only">
          記事を検索
        </label>
        <SearchIcon
          aria-hidden="true"
          className={cn(
            '-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-muted-foreground',
            isHero ? 'size-5' : 'size-4',
          )}
        />
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="記事を検索"
          className={cn(
            'w-full rounded-lg border border-input bg-card text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-border-strong',
            isHero ? 'h-12 pr-24 pl-11 text-[15px]' : 'h-9 pr-3 pl-9 text-sm',
          )}
        />
        {isHero && (
          <Button
            type="submit"
            size="sm"
            className="-translate-y-1/2 absolute top-1/2 right-2"
          >
            検索
          </Button>
        )}
      </form>
    </search>
  );
};

export default Search;
