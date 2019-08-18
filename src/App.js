import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import Plan from './pages/Plan';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Helvetica";
    font-size: 16px;
  }
  * {
    box-sizing: border-box;
  }
`;

const client = new ApolloClient({
  uri: 'http://192.168.1.125:8000/graphql/'
});

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:key" component={Plan} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
