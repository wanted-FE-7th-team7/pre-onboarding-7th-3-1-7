import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  boldTargetText: string;
}

function SuggesteadItem({ text, boldTargetText }: Props) {
  const startIndex = text.indexOf(boldTargetText);
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
      font-weight: 800;
    }
  `,
};

export default SuggesteadItem;
