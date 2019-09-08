import React from 'react';
import { Route } from 'react-router-dom';
import ShowPlan from './ShowPlan';
import CreateIdea from './CreateIdea';
import ShowIdea from './ShowIdea';

const Plan = ({ match }) => (
  <>
    <Route path={`${match.path}/new`} component={CreateIdea} />
    <Route path={`${match.path}/:idea`} component={ShowIdea} />
    <Route exact path={match.path} component={ShowPlan} />
  </>
);
export default Plan;
