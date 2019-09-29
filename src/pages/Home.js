import React from 'react';
import withUser from '../withUser';
import { Redirect } from "react-router-dom";
import Login from '../components/Login';
import PlanList from '../components/PlanList';


const Home = ({ user }) => {
  if (user === null) {
    return (<Login />);
  }

  if (user.plans.length === 1) {
    return (
      <Redirect to={`/${user.plans[0].key}`} />
    );
  }

  return (<PlanList user={user} />);
}

export default withUser(Home);
