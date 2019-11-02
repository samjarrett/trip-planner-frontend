import React from 'react';
import MUIAvatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_AVATAR_VALIDITY = gql`
  {
    brokenAvatars @client {
      gravatarHash
    }
  }
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

const AvatarButton = styled(MUIAvatar)`
  background-color: #${props => intToRGB(hashCode(props.hash))} !important;
`;

const Avatar = ({ user }) => {
  const { data, client } = useQuery(GET_AVATAR_VALIDITY);

  const brokenAvatar = data.brokenAvatars.find((element) => {
    return element.gravatarHash === user.gravatarHash;
  }) || null;

  const errorHandler = () => {
    const brokenAvatars = data.brokenAvatars.concat([{
      gravatarHash: user.gravatarHash,
      __typename: 'BrokenAvatar'
    }]);
    client.writeData({ data: { brokenAvatars } });
  }

  return (
    <AvatarButton
      title={user.firstName}
      hash={user.gravatarHash}
      src={brokenAvatar === null ? `https://www.gravatar.com/avatar/${user.gravatarHash}?s=128&d=404` : null}
      alt={user.firstName[0]}
      onError={errorHandler}
      >
        {user.firstName[0]}
    </AvatarButton>
  );
};

export default Avatar;
