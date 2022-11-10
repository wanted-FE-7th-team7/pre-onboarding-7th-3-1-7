import styled from 'styled-components';
import { Sick } from '../../interfaces';
import Input from './Input';
import Selector from './Selector';

interface Props {
  options: Sick[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ value, options, onChange }: Props) {
  return (
    <S.InputWrapper>
      <Input value={value} onChange={onChange} />
      <Selector options={options} />
    </S.InputWrapper>
  );
}

const S = {
  InputWrapper: styled.div`
    display: flex;
    position: relative;
    width: 49rem;
    flex-direction: column;
  `,
};
