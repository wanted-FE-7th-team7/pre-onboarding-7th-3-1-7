import styled from 'styled-components';

interface Props {
  rawText: string;
  boldTarget: string;
}
const BoldResult = ({ rawText, boldTarget }: Props) => {
  const reg = new RegExp(boldTarget, 'i');
  const startIndex = rawText.search(reg);
  const endIndex = startIndex + boldTarget.length;

  if (startIndex === -1) return <S.Text>{rawText}</S.Text>;
  return (
    <S.Text>
      {rawText.slice(0, startIndex)}
      <strong>{rawText.slice(startIndex, endIndex)}</strong>
      {rawText.slice(endIndex)}
    </S.Text>
  );
};

const S = {
  Text: styled.p`
    font-size: 2rem;
  `,
};

export default BoldResult;
