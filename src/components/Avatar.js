import React from 'react';
import MUIAvatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

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

const AvatarButton = styled(MUIAvatar)`
  background-color: #${props => intToRGB(hashCode(props.hash))} !important;
`;

const Avatar = ({ user }) => (
  <AvatarButton
    title={user.firstName}
    hash={user.gravatarHash}
    >
      {user.firstName[0]}
  </AvatarButton>
);

export default Avatar;
