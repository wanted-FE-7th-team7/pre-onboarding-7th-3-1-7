import React, { useCallback, useEffect, useRef, useState } from 'react';
import { search } from '../apis/SearchApi';
import styled from 'styled-components';
import { Arrow } from '../models/ArrowText';

export default function SearchHeader() {
  const [text, setText] = useState('');
  const [related, setRelated] = useState(Array<String>);
  const [index, setIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLUListElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    update();
  };

  const update = useCallback(async () => {
    const getRelatedText = await search(text);
    setRelated(
      getRelatedText.data.map((data: { sickCd: ''; sickNm: '' }) => data.sickNm)
    );
  }, [text]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (text) update();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [text, update]);

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    if (related.length > 0) {
      switch (e.key) {
        case Arrow.DOWN:
          setIndex(index + 1);
          if (autoRef.current?.childElementCount === index + 1) setIndex(0);
          break;
        case Arrow.UP:
          setIndex(index - 1);
          if (index <= 0) {
            setRelated([]);
            setIndex(-1);
          }
          break;
        case Arrow.ESCAPE:
          setRelated([]);
          setIndex(-1);
          break;
      }
    }
  };

  return (
    <S.Header>
      <form onSubmit={submitHandler} onKeyDown={handleKeyArrow}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button>검색</button>
      </form>
      <ul ref={autoRef}>
        {related.map((relatedText, i) => (
          <AutoSearchData isFocus={index === i ? true : false} key={i}>
            {relatedText}
          </AutoSearchData>
        ))}
      </ul>
    </S.Header>
  );
}

const S = {
  Header: styled.header`
    & {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: lavender;
      height: 100vh;
      width: 100vw;
    }
    form {
      width: 60%;
      display: flex;
      padding: 1.4rem 1rem;
    }
    input {
      flex: 1 0 auto;
      font-size: 1.4rem;
      padding: 0.7rem 1rem;
      border: none;
      outline: none;
      border-top-left-radius: 0.8rem;
      border-bottom-left-radius: 0.8rem;
    }
    button {
      cursor: pointer;
      background-color: #0000ff77;
      color: white;
      font-weight: bold;
      font-size: 1.4rem;
      padding: 0 2rem;
      border: none;
      outline: none;
      border-top-right-radius: 0.8rem;
      border-bottom-right-radius: 0.8rem;
    }
    ul {
      width: 60%;
      font-size: 1.5rem;
    }
  `,
};

const AutoSearchData = styled.li<{ isFocus?: boolean }>`
  z-index: 1;
  background-color: ${props => (props.isFocus ? 'white' : '')};
`;
