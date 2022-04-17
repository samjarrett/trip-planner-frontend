import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import { Link } from 'wouter';

const BackButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const BackButton = ({ url }) => (
  <BackButtonContainer>
    <Link href={url}>
      <Fab color="primary" aria-label="add">
        <ArrowBack />
      </Fab>
    </Link>
  </BackButtonContainer>
);
export default BackButton;
