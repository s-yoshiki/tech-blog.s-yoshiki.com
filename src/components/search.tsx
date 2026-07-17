'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { search as navigateToSearch } from 'lib/inner-search';

interface SearchProps { onClick?: (arg: string) => void }

const Search = ({ onClick }: SearchProps) => {
  const [value, setValue] = useState('');
  const onSearch = () => (onClick ?? navigateToSearch)(value);
  return (
    <div id="search" className="flex w-full items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
      <SearchIcon className="ml-2 size-5 text-muted-foreground" />
      <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch()} type="search" className="border-0 shadow-none focus-visible:ring-0" placeholder="キーワードで記事を検索" aria-label="記事を検索" />
      <Button onClick={onSearch}>検索</Button>
    </div>
  );
};

export default Search;
