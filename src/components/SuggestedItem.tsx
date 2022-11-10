import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  boldTargetText: string;
}

function SuggesteadItem({ text, boldTargetText }: Props) {
  const reg = new RegExp(boldTargetText, 'i');
  const startIndex = text.search(reg);
  const endIndex = startIndex + boldTargetText.length;

  return (
    <S.SuggesteadItem>
      {text.slice(0, startIndex)}
      <span className="test-bold">{text.slice(startIndex, endIndex)}</span>
      {text.slice(endIndex)}
    </S.SuggesteadItem>
  );
}

const S = {
  SuggesteadItem: styled.p`
    margin: 1rem;
    font-size: 2rem;

    .test-bold {
      font-weight: 700;
    }
  `,
};

export default SuggesteadItem;
