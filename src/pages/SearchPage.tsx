import React, { useRef, useState } from 'react';
import { getData, Sick } from '../apis/getSick';
import BoldResult from '../components/BoldText';
import { createDebounce } from '../utils/createDebounce';

const lazyGetSick = createDebounce(getData, 500);

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [sickList, setSickList] = useState<Sick[]>([]);
  const target = useRef('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { value },
  }) => {
    setSearchInput(value);

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
      <input
        placeholder="질환명을 입력해주세요."
        value={searchInput}
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

export default SearchPage;
