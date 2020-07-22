import { gql } from '@apollo/client';

const GET_IDEA_QUERY = gql`
  query getIdea($id: UUID!) {
    idea(id: $id) {
      id
      type
      title
      description
      latitude
      longitude
      googlePlaceId
      notes {
        id
        created
        creator{
          firstName
          lastName
          gravatarHash
        }
        body
        automated
      }
    }
  }
`;

export default GET_IDEA_QUERY;
