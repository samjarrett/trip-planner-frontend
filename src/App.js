import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, Switch } from 'wouter';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import ShowPlan from './pages/ShowPlan';
import CreateIdea from './pages/CreateIdea';
import ShowIdea from './pages/ShowIdea';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Helvetica";
    font-size: 16px;
  }
  * {
    box-sizing: border-box;
  }
`;

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || window.location.origin;
const client = new ApolloClient({
  uri: `${BACKEND_HOST}/graphql/`,
  credentials: 'include',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Switch>
      <Route path="/:key/new" component={CreateIdea} />
      <Route path="/:key/:idea" component={ShowIdea} />
      <Route path="/:key" component={ShowPlan} />
      <Route path="/" component={Home} />
    </Switch>
  </ApolloProvider>
);

export default App;
