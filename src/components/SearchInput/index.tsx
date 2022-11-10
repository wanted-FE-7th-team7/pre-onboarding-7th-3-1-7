import { useState, useEffect } from 'react';
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // 키보드 이벤트 핸들러
  useEffect(() => {
    setSelectedIndex(options.length ? 0 : null);
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex(idx => {
          if (idx !== null) {
            if (idx - 1 >= 0) {
              return idx - 1;
            } else {
              return idx - 1 + options.length;
            }
          }
          return null;
        });
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(idx =>
          idx !== null ? (idx + 1) % options.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [options]);

  return (
    <S.InputWrapper>
      <Input value={value} onChange={onChange} />
      <Selector selected={selectedIndex} value={value} options={options} />
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
