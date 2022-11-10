import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { getSearch } from '../apis/api';

interface Props {
  set: boolean;
}
export function SearchPage() {
  const [set, setOn] = useState<boolean>(false);
  const [searchValue, setSearcValue] = useState('');
  const [searchData, setSearchData] = useState([]);

  const changeInputState = (e: any) => {
    if (e.target.tagName === 'INPUT') {
      setOn(true);
    } else {
      setOn(false);
    }
  };

  const handleChange = (e: {
    target: { value: any };
    preventDefault: () => void;
  }) => {
    const { value } = e.target;
    setSearcValue(value);
    e.preventDefault();
    setTimeout(() => {
      if (searchValue) getSearch(searchValue, setSearchData);
    }, 200);
  };

  return (
    <S.MainWrap onClick={changeInputState}>
      <S.MainCenter>
        <S.Title>국내 모든 임상시험 검색하고</S.Title>
        <S.Title>온라인으로 참여하기</S.Title>
        <S.SearchWrap>
          <S.SearchInner set={set}>
            <S.SearchBar
              onChange={handleChange}
              placeholder="질환명을 입력해 주세요."
            />
            <S.Button>
              <BsSearch color="#ffff" />
            </S.Button>
          </S.SearchInner>
        </S.SearchWrap>

        {searchData &&
          searchData.map((sick: any) => (
            <S.li key={sick.sickCd}>{sick.sickNm}</S.li>
          ))}
      </S.MainCenter>
    </S.MainWrap>
  );
}
const S = {
  MainWrap: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #cae9ff;
  `,
  MainCenter: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 490px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding: 120px 0 290px;
  `,

  Title: styled.h1`
    display: flex;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.6;
    margin: 0;
    margin-bottom: 20px;
    font-family: inherit;
    text-align: center;
    flex-direction: column;
  `,
  SearchWrap: styled.div`
    display: flex;
    max-width: 320px;
    width: 100%;
    margin: 0 auto;
  `,
  SearchInner: styled.div<Props>`
    display: flex;
    border-radius: 42px;
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    box-shadow: 0px 2px 4px rgb(30 32 37 / 10%);
    cursor: pointer;
    border: ${props => (props.set ? '3px solid #007be9' : 'none')};
  `,

  Button: styled.button`
    background-color: #007be9;
    border: none;
    width: 45px;
    height: 42px;
    border-radius: 50%;
  `,

  SearchBar: styled.input`
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: -0.018em;
    line-height: 1.6;
    font-family: inherit;
    width: 90%;
    border: none;
    color: black;
    cursor: pointer;
    outline: none;

    &:focus::placeholder {
      color: transparent;
    }
  `,

  li: styled.li``,
};
