import React from 'react';
import MUIAvatar from '@material-ui/core/Avatar';
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

function hashCode(str) { // java String#hashCode
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i){
  const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

const Avatar = styled(MUIAvatar)`
  background-color: #${props => intToRGB(hashCode(props.hash))} !important;
`;

const Avatars = ({ users }) => (
  <Wrapper>
    <Summary>{users.length} travellers</Summary>
    <AvatarWrapper>
      {users.map(user =>
        <Avatar
          key={user.id}
          title={user.firstName}
          hash={user.gravatarHash}
          >
            {user.firstName[0]}
        </Avatar>
      )}
    </AvatarWrapper>
  </Wrapper>
);
export default Avatars;
