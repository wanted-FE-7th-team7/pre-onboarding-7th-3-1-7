import styled from 'styled-components';
const PLACEHOLDER_SEARCH_INPUT = '질환명을 입력해주세요.';
const NAME_SEARCH_INPUT = 'search-input';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value, onChange }: Props) {
  return (
    <>
      <S.Input
        value={value}
        name={NAME_SEARCH_INPUT}
        placeholder={PLACEHOLDER_SEARCH_INPUT}
        onChange={onChange}
      />
      <S.SearchButton />
    </>
  );
}

const S = {
  Input: styled.input`
    border-radius: 42rem;
    background-color: #FFFFFF;
    height : 7.3rem;
    border : none;
}`,
  SearchButton: styled.button`
    position: absolute;
    right: 8px;
    top: 1.3rem;
    height: 5px;
    background-color: #007be9;
    width: 4.8rem;
    height: 4.8rem;
    border: 0px;
    border-radius: 50%;
  `,
};
