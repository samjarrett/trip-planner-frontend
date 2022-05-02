import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Link } from 'wouter';

const Wrapper = styled(Paper)`
  margin: 1rem 0;
  padding: 1rem 1rem 0.25rem 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CancelWrapper = styled.div`
  text-align: right;
`;

const Title = styled.h4`
  margin: 0;
`;

const Card = ({ title, description = null, linkDestination }) => {
  let i = 0;

  return (
    <Wrapper>
      <Title>{title}</Title>
      {description &&
        description.split("\n").map((item) =>
          <p key={++i}>{item}</p>
        )
      }
      <CancelWrapper>
        <Link href={linkDestination}><Button>Open</Button></Link>
      </CancelWrapper>
    </Wrapper>
  );
};
export default Card;
