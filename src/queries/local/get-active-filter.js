import { gql } from 'apollo-boost';

const GET_ACTIVE_FILTER = gql`
  {
    activeFilter @client
  }
`;

export default GET_ACTIVE_FILTER;
