import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSick } from '../apis/getSick';
import InputGroup from '../components/InputGroup';
import SuggestedItem from '../components/SuggestedItem';

interface Sick {
  sickCd: string;
  sickNm: string;
}

function SerchPage() {
  const [searchSick, setSearchSick] = useState('');
  const [sickList, setsickList] = useState([]);

  useEffect(() => getSick(searchSick, setsickList), [searchSick]);

  const suggestedSickList = sickList.filter((sick: Sick) =>
    sick.sickNm.includes(searchSick)
  );

  return (
    <S.SerchLayout>
      <div className="title">
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </div>

      <S.InputLayout>
        <InputGroup
          placeholder="질환명을 입력해주세요"
          value={searchSick}
          setValue={setSearchSick}
        />
      </S.InputLayout>

      {searchSick.length > 0 && suggestedSickList.length === 0 && (
        <div className="suggest-box">
          <SuggestedItem text={searchSick} boldTargetText={searchSick} />

          <div className="suggest-start">일치하는 검색어가 없습니다</div>
        </div>
      )}

      {searchSick.length > 0 && suggestedSickList.length > 0 && (
        <div className="suggest-box">
          <SuggestedItem text={searchSick} boldTargetText={searchSick} />

          <div className="suggest-start">추천 검색어</div>

          {suggestedSickList.map((sick: Sick) => (
            <SuggestedItem
              key={sick.sickCd}
              text={sick.sickNm}
              boldTargetText={searchSick}
            />
          ))}
        </div>
      )}
    </S.SerchLayout>
  );
}

const S = {
  SerchLayout: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #d0e8fd;

    padding: 5rem;
    width: 100%;
    min-height: 100vh;
    height: auto;

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 5rem;
      font-weight: 700;

      margin-bottom: 5rem;
    }

    .suggest-box {
      padding: 2rem;

      width: 75rem;
      min-height: 10rem;
      height: auto;

      white-space: normal;

      background-color: white;
      border-radius: 20px;
    }

    .suggest-start {
      font-size: 2rem;
      color: gray;
    }
  `,

  InputLayout: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 75rem;
    height: 8rem;

    background-color: white;
    border-radius: 100px;

    margin-bottom: 1rem;
  `,
};

export default SerchPage;