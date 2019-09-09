import React from 'react';
import withUser from '../withUser';
import { Redirect, Link } from "react-router-dom";
import Login from '../components/Login';

const Home = ({ user }) => {

  if (user === null) {
    return (<Login />);
  }

  if (user.plans.length === 1) {
    return (
      <Redirect to={`/${user.plans[0].key}`} />
    );
  }

  return (
    <>
      <h2>You have {user.plans.length} plans to chose from.</h2>
      <ul>
        {user.plans.map((plan) =>
          <li key={plan.key}>
            <Link to={`/${plan.key}`}>{plan.key}</Link>
          </li>
        )}
      </ul>
    </>
  );
}

export default withUser(Home);
