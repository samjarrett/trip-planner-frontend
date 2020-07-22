import { gql } from '@apollo/client';

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: NoteMutationInput!) {
    createNote(input: $input) {
      errors {
        field
        messages
      }
      note {
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

export default CREATE_NOTE_MUTATION;
