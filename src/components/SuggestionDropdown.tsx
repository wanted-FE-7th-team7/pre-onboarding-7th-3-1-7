import { MouseEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  sickNm: string;
  target: string;
  isSelected: boolean;
  handleOnClick: MouseEventHandler;
}

const SuggestionDropdown = ({
  sickNm,
  target,
  isSelected,
  handleOnClick,
}: Props) => {
  const index = sickNm.indexOf(target);
  const endIndex = index + target.length;
  const prev = sickNm.slice(0, index);
  const next = sickNm.slice(endIndex);

  return (
    <li className={isSelected ? 'selected' : ''} onClick={handleOnClick}>
      {prev}
      <BoldText>{target}</BoldText>
      {next}
    </li>
  );
};

export default SuggestionDropdown;
const BoldText = styled.span`
  font-weight: 700;
`;
