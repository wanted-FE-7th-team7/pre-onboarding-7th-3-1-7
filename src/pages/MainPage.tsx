import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSearchResult } from '../apis';
import SearchInput from '../components/SearchInput';
import { Sick } from '../interfaces';

export default function MainPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>('담낭');
  const [searchResult, setSearchResult] = useState<Sick[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getSearchResult(searchKeyword);
      setSearchResult(data ? data : []);
    })();
  }, [searchKeyword]);
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
