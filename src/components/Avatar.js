import React from 'react';
import MUIAvatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { makeVar } from '@apollo/client';

const brokenAvatars = makeVar([]);

function hashCode(str) { // java String#hashCode
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

const AvatarButton = styled(MUIAvatar)`
  background-color: #${props => intToRGB(hashCode(props.hash))} !important;
`;

const Avatar = ({ user }) => {
  const isBrokenAvatar = brokenAvatars().includes(user.gravatarHash);

  const errorHandler = () => {
    brokenAvatars(brokenAvatars().concat([user.gravatarHash]));
  }

  return (
    <AvatarButton
      title={user.firstName}
      hash={user.gravatarHash}
      src={isBrokenAvatar === false ? `https://www.gravatar.com/avatar/${user.gravatarHash}?s=128&d=404` : null}
      alt={user.firstName[0]}
      onError={errorHandler}
    >
      {user.firstName[0]}
    </AvatarButton>
  );
};

export default Avatar;
