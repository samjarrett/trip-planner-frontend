import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import Link from './Link';

const BackButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const BackButton = ({ url }) => (
  <BackButtonContainer>
    <Fab color="primary" aria-label="add" to={url} component={Link}>
      <ArrowBack />
    </Fab>
  </BackButtonContainer>
);
export default BackButton;
