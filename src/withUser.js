import React from 'react';
import { useQuery } from '@apollo/client';
import GET_USER_QUERY from './queries/get-user';

function withUser(WrappedComponent) {
  return (props) => {
    const { data, error, loading } = useQuery(GET_USER_QUERY);

    if (loading) return null;
    if (error) return (
      <>
        <h1>Error :(</h1>
        <p>${error.message}</p>
      </>
    );

    const user = data.user;

    return (
      <WrappedComponent user={user} {...props} />
    )
  }
}
export default withUser;
