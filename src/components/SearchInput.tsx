import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEBOUNCING_TIME } from '../apis/api';
import { getSicks } from '../apis/Sicks.service';
import { useDebounce } from '../hooks/useDebounce';
import useHandleInputEvent from '../hooks/useHandleInputEvent';
import { Sick } from '../types';
import SuggestionDropdown from './SuggestionDropdown';

function SearchInput() {
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState<Sick[]>([]);
  const hasNoSuggestions = searchResult.length === 0;
  const debouncedKeyword = useDebounce<string>(input, DEBOUNCING_TIME);

  const {
    handleKeyDown,
    handleOnFocus,
    handleOnBlur,
    selectedIndex,
    isOpenDropdown,
    goToSuggestion,
    resetIndex,
    inputRef,
  } = useHandleInputEvent(searchResult);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    resetIndex();
  };

  useEffect(() => {
    (async () => {
      if (debouncedKeyword.trim()) {
        const data = await getSicks(debouncedKeyword);
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    })();
  }, [debouncedKeyword]);

  return (
    <>
      <Wrapper>
        <input
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onKeyDown={e => handleKeyDown(e)}
          ref={inputRef}
        />
      </Wrapper>
      {isOpenDropdown && (
        <StyledSuggestionBox>
          <BoldText>{input}</BoldText>
          {hasNoSuggestions && <BoldText>검색어 없음</BoldText>}
          {!hasNoSuggestions &&
            searchResult.map(({ sickCd, sickNm }, index) => (
              <SuggestionDropdown
                key={sickCd}
                sickNm={sickNm}
                target={debouncedKeyword}
                isSelected={index === selectedIndex}
                handleOnClick={e =>
                  goToSuggestion(e, searchResult[index].sickNm)
                }
              />
            ))}
        </StyledSuggestionBox>
      )}
    </>
  );
}

export default SearchInput;

const Wrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #ffffff;
  border-radius: 3rem;
  width: 50rem;
  margin-bottom: 1rem;
  position: absolute;
  top: 0;

  input {
    width: 100%;
    border: none;
    padding: 2rem;
    border-radius: 2rem;
    font-size: 1.5rem;
  }
`;

const StyledSuggestionBox = styled.ul`
  position: absolute;
  top: 7rem;
  width: 50rem;

  background-color: #ffffff;
  border-radius: 2rem;
  font-size: 1.5rem;
  overflow: hidden;

  a,
  li {
    display: block;
    width: 100%;
    height: 4rem;
    padding: 0 2rem;
    line-height: 4rem;
    text-decoration: none;
    color: #000000;
    cursor: pointer;
  }
  li:hover {
    background-color: #eeeeee;
  }
  .selected {
    background-color: #eeeeee;
  }
`;
const BoldText = styled.li`
  font-weight: 700;
`;
