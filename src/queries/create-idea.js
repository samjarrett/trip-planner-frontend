import { gql } from 'apollo-boost';

const CREATE_IDEA_MUTATION = gql`
  mutation CreateIdea($input: IdeaMutationInput!) {
    createIdea(input: $input) {
      errors {
        field
        messages
      }
      idea {
        id
        title
        description
        type
        latitude
        longitude
        googlePlaceId
      }
    }
  }
`;

export default CREATE_IDEA_MUTATION;
