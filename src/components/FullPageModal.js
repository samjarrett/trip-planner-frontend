import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const OuterContainer = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled(Paper)`
  width: 470px;
  max-width: 100%;
  min-height: 270px;
  padding: 1rem;
  position: relative;
`;

const FullPageModal = ({ children }) => (
    <OuterContainer>
      <Container>
        {children}
      </Container>
    </OuterContainer>
);
export default FullPageModal;
