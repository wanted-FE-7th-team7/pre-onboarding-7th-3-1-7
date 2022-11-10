import styled from 'styled-components';

interface Props {
  sickNm: string;
  target: string;
}

const SuggestionDropdown = ({ sickNm, target }: Props) => {
  const changeToBoldText = (target: string, str: string) => {
    const index = str.indexOf(target);
    return [
      str.slice(0, index),
      str.slice(index, index + target.length),
      str.slice(index + target.length),
    ];
  };

  return (
    <li>
      {changeToBoldText(target, sickNm)[SUGGESTIONS.PREV]}
      <BoldText>
        {changeToBoldText(target, sickNm)[SUGGESTIONS.TARGET]}
      </BoldText>
      {changeToBoldText(target, sickNm)[SUGGESTIONS.NEXT]}
    </li>
  );
};

export default SuggestionDropdown;
export const BoldText = styled.span`
  font-weight: 700;
`;

const SUGGESTIONS = {
  PREV: 0,
  TARGET: 1,
  NEXT: 2,
};