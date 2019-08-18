import React from 'react';
import { Route } from 'react-router-dom';
import ShowPlan from './ShowPlan';
import CreateIdea from './CreateIdea';

const Plan = ({ match }) => (
  <>
    <Route path={`${match.path}/new`} component={CreateIdea} />
    <Route exact path={match.path} component={ShowPlan} />
  </>
);
export default Plan;
