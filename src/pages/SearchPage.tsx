import styled from 'styled-components';
import SearchInput from '../components/SearchInput';
import StyledText from '../components/StyledText';
import { flex } from '../styles/Common';

interface Props {}

function SearchPage() {
  const textArr = ['국내 모든 임상시험 검색하고', '온라인으로 참여하기'];
  return (
    <SearchPageWrapper>
      <Header>
        <StyledText textArr={textArr} />
      </Header>
      <Main>
        <SearchInput />
      </Main>
    </SearchPageWrapper>
  );
}

export default SearchPage;

const SearchPageWrapper = styled.div`
  height: 100vh;
  background-color: rgb(208, 232, 253);
`;

const Header = styled.header`
  padding: 5rem;
`;
const Main = styled.main`
  position: relative;
  width: 100%;
  ${flex()}
`;
