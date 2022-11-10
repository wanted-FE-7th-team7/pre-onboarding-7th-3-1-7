import React from 'react';
import SearchHeader from '../components/SearchHeader';
import styled from 'styled-components';

export default function SearchMain() {
  return (
    <S.Container>
      <SearchHeader />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    & {
      background-color: red;
    }
  `,
};
