'use client';

import { Button, cx, Input } from '@repo/ui';
import { search as navigateToSearch } from 'lib/inner-search';
import { Search as SearchIcon } from 'lucide-react';
import { useId, useState } from 'react';
import styles from './search.module.css';

interface SearchProps {
  onSearch?: (arg: string) => void;
  /** `hero` is the large field on content pages, `compact` the one in the header */
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
      data-variant={variant}
      className={cx(styles.root, className)}
    >
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor={inputId} className="visually-hidden">
          記事を検索
        </label>
        <SearchIcon aria-hidden="true" className={styles.icon} />
        <Input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="記事を検索"
          size={isHero ? 'lg' : 'md'}
          className={styles.input}
        />
        {isHero && (
          <Button type="submit" size="sm" className={styles.submit}>
            検索
          </Button>
        )}
      </form>
    </search>
  );
};

export default Search;
