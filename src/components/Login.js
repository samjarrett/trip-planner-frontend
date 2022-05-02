import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useLocation } from "wouter";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

import FullPageModal from './FullPageModal';

import LOGIN_MUTATION from '../queries/login';
import GET_USER_QUERY from '../queries/get-user';

const DEFAULT_STATE = {
  username: '',
  password: '',
  errors: false
};

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const Login = () => {
  const [location, setLocation] = useLocation();
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
        setLocation('/');
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
  };

  return (
    <FullPageModal>
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
        <TextField fullWidth={true} variant="standard" label="Username" name="username" type="email" placeholder="my@email.com" value={state.username} onChange={handleChange} error={state.errors} />
        <TextField fullWidth={true} variant="standard" label="Password" name="password" type="password" value={state.password} onChange={handleChange} error={state.errors} helperText={state.errors && "Login failed"} />
        <ButtonContainer>
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
        </ButtonContainer>
      </form>
    </FullPageModal>
  );
};

export default Login;
