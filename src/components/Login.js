import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import LOGIN_MUTATION from '../queries/login';
import GET_USER_QUERY from '../queries/get-user';

const DEFAULT_STATE = {
  username: '',
  password: '',
  errors: false
};

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  width: 470px;
  max-width: 100%;
  min-height: 270px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  padding: 1rem;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const Login = withRouter(({ history }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [login] = useMutation(LOGIN_MUTATION, {
    update(cache, { data: { login: { success, user } } }) {
      if (success) {
        cache.writeQuery({
          query: GET_USER_QUERY,
          data: { user }
        });
      } else {
        setState({ ...state, errors: true })
      }
    },
    onCompleted: () => {
      if (!state.errors) {
        history.push(`/`);
      }
    }
  });

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <OuterContainer>
      <Container>
        <h2>Login</h2>
        <form onSubmit={e => {
          e.preventDefault();
          login({
            variables: {
              username: state.username,
              password: state.password
            }
          });
        }}>
          <TextField fullWidth={true} label="Username" name="username" type="email" placeholder="my@email.com" value={state.username} onChange={handleChange} error={state.errors} />
          <TextField fullWidth={true} label="Password" name="password" type="password" value={state.password} onChange={handleChange} error={state.errors} helperText={state.errors && "Login failed"}/>
          <ButtonContainer>
            <Button color="primary" variant="contained" type="submit">
              Login
            </Button>
          </ButtonContainer>
        </form>
      </Container>
    </OuterContainer>
  );
});

export default Login;
