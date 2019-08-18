import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Wrapper = styled(Paper)`
  margin: 1rem;
  padding: 1rem 1rem 0.25rem 1rem;
`;

const CancelWrapper = styled.div`
  text-align: right;
`;

const Card = ({ idea }) => {
  return (
    <Wrapper>
      <a href="#">{idea.title}</a>
      { idea.description &&
        <p>{idea.description}</p>
      }
      <CancelWrapper>
        <Button>Open</Button>
        <Button>Edit</Button>
      </CancelWrapper>
    </Wrapper>
  );
}
export default Card;
