import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { getSick, Sick } from '../apis/getSick';
import BoldResult from '../components/BoldText';
import { createDebounce } from '../utils/createDebounce';

const lazyGetSick = createDebounce(getSick, 500);

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sickList, setSickList] = useState<Sick[]>([]);
  const target = useRef('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { value },
  }) => {
    setSearchValue(value);

    const { data } = await lazyGetSick(value);

    target.current = value;
    if (value !== '') {
      setSickList(data);
    } else {
      setSickList([]);
    }
  };

  return (
    <div>
      <S.SearchInput
        placeholder="질환명을 입력해주세요."
        value={searchValue}
        onChange={handleChange}
      />
      {sickList.map(sick => (
        <BoldResult
          key={sick.sickCd}
          rawText={sick.sickNm}
          boldTarget={target.current}
        />
      ))}
    </div>
  );
};

const S = {
  SearchInput: styled.input`
    font-size: 2rem;
  `,
};
export default SearchPage;
