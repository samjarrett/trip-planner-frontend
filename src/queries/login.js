import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      user {
        id
        firstName
        gravatarHash
        plans {
          key
        }
      }
    }
  }
`;

export default LOGIN_MUTATION;
