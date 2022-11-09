import React from 'react';
import styled from 'styled-components';

function SerchPage() {
  return <S.SerchLayout />;
}

const S = {
  SerchLayout: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d0e8fd;
    width: 100%;
    height: 100vh;
  `,
};

export default SerchPage;
