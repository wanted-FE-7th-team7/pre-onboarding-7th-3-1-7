import styled from 'styled-components';
import { flex } from '../styles/Common';

interface Props {
  textArr: string[];
}

function StyledText({ textArr }: Props) {
  return (
    <Wrapper>
      {textArr.map(text => (
        <Text key={text}>{text}</Text>
      ))}
    </Wrapper>
  );
}

export default StyledText;

const Wrapper = styled.div`
  ${flex('center', 'center', 'column')}
`;
const Text = styled.p`
  font-weight: 700;
  font-size: 3rem;
  margin: 1rem;
`;
