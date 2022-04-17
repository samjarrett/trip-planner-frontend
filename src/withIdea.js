import React from 'react';
import { useQuery } from '@apollo/client';
import GET_IDEA_QUERY from './queries/get-idea';

function withIdea(WrappedComponent) {
  return (props) => {
    const { data, error, loading } = useQuery(GET_IDEA_QUERY, { variables: { id: props.params.idea } });

    if (loading) return null;
    if (error) return (
      <>
        <h1>Error :(</h1>
        <p>${error.message}</p>
      </>
    );

    const idea = data.idea;

    if (idea === null) {
      return null;
    }

    return (
      <WrappedComponent idea={idea} {...props} />
    )
  }
}
export default withIdea;
