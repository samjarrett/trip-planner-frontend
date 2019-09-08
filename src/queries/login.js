import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      user {
        id
        plans {
          key
        }
      }
    }
  }
`;

export default LOGIN_MUTATION;
