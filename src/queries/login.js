import { gql } from 'apollo-boost';
import { USER_FIELDS } from './get-user';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

export default LOGIN_MUTATION;
