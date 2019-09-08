import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

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
    margin-right: -1rem;
    border: 2px solid #fff
  }
  > *:last-child {
    margin-right: 0;
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
        <Avatar
          key={user.id}
          alt={user.firstName}
          imgProps={{title: user.firstName}}
          src={`http://gravatar.com/avatar/${user.gravatarHash}?d=mp`} />
      )}
    </AvatarWrapper>
  </Wrapper>
);
export default Avatars;
