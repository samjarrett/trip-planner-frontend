import React from 'react';
import { useQuery } from '@apollo/client';
import GET_PLAN_QUERY from './queries/get-plan';

function withPlan(WrappedComponent) {
  return (props) => {
    const { data, error, loading } = useQuery(GET_PLAN_QUERY, { variables: { key: props.match.params.key } });

    if (loading) return null;
    if (error) return (
      <>
        <h1>Error :(</h1>
        <p>${error.message}</p>
      </>
    );

    const plan = data.plan;

    if (plan === null) {
      return null;
    }

    return (
      <WrappedComponent plan={plan} {...props} />
    )
  }
}
export default withPlan;
