import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

const Wrapper = styled.div`
  margin: 1rem 1rem 1rem 5rem;
  padding: 1rem;
  display: flex;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  flex-grow: 1;

  > * {
    margin-right: -0.75rem;
    border: 2px solid #fff
  }
  > *:last-child {
    margin-right: 0;
  }

  :hover > * {
    opacity: 0.3;
  }
  :hover > *:hover {
    opacity: 1;
    z-index: 1000;
  }
`;

const Summary = styled.p`
  display: inline-block;
  font-weight: bold;
  margin: 0;
  align-self: center;
`;

const Avatars = ({ users }) => (
  <Wrapper>
    <Summary>{users.length} travellers</Summary>
    <AvatarWrapper>
      {users.map(user =>
        <Avatar key={user.id} user={user} />
      )}
    </AvatarWrapper>
  </Wrapper>
);
export default Avatars;
