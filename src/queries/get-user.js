import { gql } from '@apollo/client';

const USER_FIELDS = `
  id
  firstName
  gravatarHash
  plans {
    key
    title
  }
`;
export { USER_FIELDS };

const GET_USER_QUERY = gql`
  query getUser {
    user {
      ${USER_FIELDS}
    }
  }
`;

export default GET_USER_QUERY;
