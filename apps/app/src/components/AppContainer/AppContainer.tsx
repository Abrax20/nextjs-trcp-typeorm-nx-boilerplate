import styled from '@emotion/styled';

import { NavigationBar } from './NavigationBar';
import { useNavigation } from './useNavigation';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;
const StyledContent = styled.main`
  flex: 1;
  display: flex;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
const StyledNavigation = styled.aside``;

type PropsType = {
  children: React.ReactNode;
};
export function AppContainer({ children }: PropsType) {
  const { sub, main, items, show } = useNavigation();

  return (
    <StyledContainer>
      {show && (
        <StyledNavigation>
          <NavigationBar items={items} mainItem={main} subItem={sub} />
        </StyledNavigation>
      )}
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}
