import { gql } from 'apollo-boost';

const GET_USER_QUERY = gql`
  query getUser {
    user {
      id
      firstName
      gravatarHash
      plans {
        key
      }
    }
  }
`;

export default GET_USER_QUERY;
