interface Props {
  rawText: string;
  boldTarget: string;
}
const BoldResult = ({ rawText, boldTarget }: Props) => {
  const reg = new RegExp(boldTarget, 'i');
  const startIndex = rawText.search(reg);
  const endIndex = startIndex + boldTarget.length;

  if (startIndex === -1) return <p>{rawText}</p>;
  return (
    <p>
      {rawText.slice(0, startIndex)}
      <strong>{rawText.slice(startIndex, endIndex)}</strong>
      {rawText.slice(endIndex)}
    </p>
  );
};

export default BoldResult;
