import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 1px solid #666;
  border-radius: 2px;
`;
const Card = ({ idea }) => {
  return (
    <Wrapper>
      <p>{idea.title}</p>
      { idea.description &&
        <p>{idea.description}</p>
      }
    </Wrapper>
  );
}
export default Card;
