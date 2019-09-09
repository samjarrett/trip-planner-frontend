import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
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
    <Switch>
      <Route path={`${match.path}/new`} component={CreateIdea} />
      <Route path={`${match.path}/:idea`} component={ShowIdea} />
      <Route exact path={match.path} component={ShowPlan} />
    </Switch>
  );
};
export default withUser(Plan);

