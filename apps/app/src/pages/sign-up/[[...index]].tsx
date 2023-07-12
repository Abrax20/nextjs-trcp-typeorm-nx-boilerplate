import { SignUp } from '@clerk/nextjs';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Page() {
  return (
    <StyledContainer>
      <SignUp />
    </StyledContainer>
  );
}
