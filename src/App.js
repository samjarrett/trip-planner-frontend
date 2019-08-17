import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom';
import Home from './components/Home';
import Plan from './components/Plan';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/'
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:key" component={Plan} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
