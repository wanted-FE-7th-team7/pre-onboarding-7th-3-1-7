import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSearchResult } from '../apis';
import SearchInput from '../components/SearchInput';
import { useDebounce } from '../hooks/useDebounce';
import { Sick } from '../interfaces';

const DEBOUNCED_MS = 1000;

export default function MainPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Sick[]>([]);
  const debouncedKeyword = useDebounce<string>(searchKeyword, DEBOUNCED_MS);

  useEffect(() => {
    (async () => {
      if (debouncedKeyword) {
        const data = await getSearchResult(debouncedKeyword);
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    })();
  }, [debouncedKeyword]);

  return (
    <S.Wrapper>
      <SearchInput
        value={searchKeyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchKeyword(e.currentTarget.value);
        }}
        options={searchResult}
      />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #cae9ff;
    display: flex;
    justify-content: center;
  `,
};
