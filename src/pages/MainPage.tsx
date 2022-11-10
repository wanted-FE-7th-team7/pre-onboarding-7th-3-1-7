import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSickList } from '../apis';
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
      if (debouncedKeyword.trim()) {
        const data = await getSickList(debouncedKeyword);
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    })();
  }, [debouncedKeyword]);

  return (
    <S.Wrapper>
      <S.TitleText>국내 모든 임상시험 검색하고</S.TitleText>
      <S.TitleText>온라인으로 참여하기</S.TitleText>
      <SearchInput
        value={searchKeyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchKeyword(e.currentTarget.value);
          setSearchResult([]);
        }}
        keyword={debouncedKeyword}
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
    flex-direction: column;
    align-items: center;
  `,
  TitleText: styled.h1`
    font-size: 5rem;
    font-weight: bold;
    padding-bottom: 5rem;
  `,
};
