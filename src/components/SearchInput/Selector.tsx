import styled from 'styled-components';
import { Sick } from '../../interfaces';

const TEXT_SELECTOR = '최근 검색어';

interface Props {
  options: Sick[];
}

export default function InputSelector({ options }: Props) {
  return (
    <S.SelectorWrapper>
      <>
        <S.SelectorText>{TEXT_SELECTOR}</S.SelectorText>
        {options.map(option => (
          <S.SelectorOption key={option.sickCd}>
            {option.sickNm}
          </S.SelectorOption>
        ))}
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
  `,
  SelectorText: styled.span`
    color: gray;
    font-weight: 700;
    font-size: 1.6rem;
  `,
  SelectorOption: styled.span`
    display: flex;
    align-items: center;
    height: 3.2rem;
    font-size: 1.6rem;
    font-weight: 700;
  `,
};
