import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withUser from '../withUser';
import ShowPlan from './ShowPlan';
import CreateIdea from './CreateIdea';
import ShowIdea from './ShowIdea';

const Plan = ({ match, user }) => {

  if (!user) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <>
      <Route path={`${match.path}/new`} component={CreateIdea} />
      <Route path={`${match.path}/:idea`} component={ShowIdea} />
      <Route exact path={match.path} component={ShowPlan} />
    </>
  );
};
export default withUser(Plan);

