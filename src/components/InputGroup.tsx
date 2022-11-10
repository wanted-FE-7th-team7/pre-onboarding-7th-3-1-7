import React from 'react';
import styled from 'styled-components';

interface InputGroupProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  setValue: (str: string) => void;
}

const InputGroup = ({
  type,
  placeholder,
  value,
  setValue,
}: InputGroupProps) => {
  return (
    <InputLayout>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input"
        autoComplete="off"
      />
    </InputLayout>
  );
};

const InputLayout = styled.div`
  input {
    width: 65rem;
    height: 5rem;
    font-size: 3rem;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

export default InputGroup;
