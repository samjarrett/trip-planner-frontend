import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled(Paper)`
  margin: ${props => props.sideMargins ? '1rem' : '1rem 0'};
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

const Card = withRouter(({ title, description = null, linkDestination, sideMargins = true }) => {
  let i = 0;

  return (
    <Wrapper sideMargins={sideMargins}>
      <Title>{title}</Title>
      { description &&
        description.split("\n").map((item) =>
            <p key={++i}>{item}</p>
        )
      }
      <CancelWrapper>
        <Button to={linkDestination} component={Link}>Open</Button>
      </CancelWrapper>
    </Wrapper>
  );
});
export default Card;
