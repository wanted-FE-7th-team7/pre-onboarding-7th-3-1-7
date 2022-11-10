import { KeyboardEvent, ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { DEBOUNCING_TIME } from '../apis/api';
import { getSicksQuery } from '../apis/Sicks.service';
import { Sick } from '../types';
import SuggestionDropdown, { BoldText } from './SuggestionDropdown';

function SearchInput() {
  const [input, setInput] = useState('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<Sick[]>([]);
  const [sugeestionIndex, setSuggestionIndex] = useState(-1);
  const settimeout = useRef<NodeJS.Timeout | undefined>();
  const prevQuery = useRef<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === '') {
      return;
    }

    clearTimeout(settimeout.current);
    settimeout.current = setTimeout(async () => {
      prevQuery.current = e.target.value;
      const sicks = await getSicksQuery(e.target.value);
      setSuggestions([...sicks]);
    }, DEBOUNCING_TIME);
  };
  return (
    <>
      <Wrapper>
        <input
          onFocus={() => setIsOpenDropdown(true)}
          onBlur={() => setIsOpenDropdown(false)}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      </Wrapper>
      {isOpenDropdown && (
        <StyledSuggestionBox>
          <li key={`0${input}`}>
            <BoldText>{input}</BoldText>
          </li>
          {hasNoSuggestions && <BoldText>검색어 없음</BoldText>}
          {!hasNoSuggestions &&
            suggestions.map(({ sickCd, sickNm }) => (
              <SuggestionDropdown
                key={sickCd}
                sickNm={sickNm}
                target={prevQuery.current}
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
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 2rem;
  font-size: 1.5rem;
  li {
    width: 100%;
    height: 3rem;
  }
`;
