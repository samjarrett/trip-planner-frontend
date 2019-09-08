import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled(Paper)`
  margin: 1rem;
  padding: 1rem 1rem 0.25rem 1rem;
`;

const CancelWrapper = styled.div`
  text-align: right;
`;

const Title = styled.h4`
  margin: 0;
`;

const Card = withRouter(({ idea, match }) => {
  let i = 0;

  return (
    <Wrapper>
      <Title>{idea.title}</Title>
      { idea.description &&
        idea.description.split("\n").map((item) =>
            <p key={++i}>{item}</p>
        )
      }
      <CancelWrapper>
        <Button to={`${match.url}/${idea.id}`} component={Link}>Open</Button>
        {/* <Button to={`${match.url}/${idea.id}/edit`} component={Link}>Edit</Button> */}
      </CancelWrapper>
    </Wrapper>
  );
});
export default Card;
