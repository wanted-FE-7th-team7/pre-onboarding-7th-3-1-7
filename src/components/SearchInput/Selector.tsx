import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sick } from '../../interfaces';

interface Props {
  value: string;
  selected: number | null;
  options: Sick[];
}

export default function InputSelector({ value, options, selected }: Props) {
  return (
    <S.SelectorWrapper>
      <>
        {options.map((option, index) => {
          const [before, after] = option.sickNm.split(value);
          return (
            <S.Option selected={selected === index} key={option.sickCd}>
              <S.OptionText>{before}</S.OptionText>
              <S.OptionBold>{value}</S.OptionBold>
              <S.OptionText>{after}</S.OptionText>
            </S.Option>
          );
        })}
      </>
    </S.SelectorWrapper>
  );
}

const S = {
  SelectorWrapper: styled.div`
    width: 100%;
    min-height: 10rem;
    background-color: #ffffff;
    margin-top: 0.8rem;
    border-radius: 2.4rem;
    display: flex;
    flex-direction: column;
    padding: 1.6rem 0;
  `,

  Option: styled.div<{ selected: boolean }>`
    background-color: ${({ selected }) => (selected ? '#eeeeee' : '#ffffff')};
  `,

  OptionText: styled.span`
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    font-size: 1.6rem;
    font-weight: normal;
  `,

  OptionBold: styled.span`
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    font-size: 1.6rem;
    font-weight: 900;
  `,
};
