import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Avatar from './Avatar';
import withUser from '../withUser';

import GET_IDEA_QUERY from '../queries/get-idea';
import CREATE_NOTE_MUTATION from '../queries/create-note';


const Wrapper = styled(Paper)`
  margin: 1rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
`;

const NoteForm = styled.form`
  margin-left: 1rem;
  flex-grow: 1;
`;

const CancelWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: right;
`;

const DEFAULT_STATE = {
  body: ''
};

const CreateNote = ({ user, ideaId }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
    update(cache, { data: { createNote } }) {
      const { idea } = cache.readQuery({ query: GET_IDEA_QUERY, variables: { id: ideaId } });
      const notes = [createNote.note].concat(idea.notes);

      cache.writeQuery({
        query: GET_IDEA_QUERY,
        variables: { id: ideaId },
        data: { idea: {
          ...idea,
          notes
        } },
      });

      setState(DEFAULT_STATE);
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
    <Wrapper>
      <Avatar user={user} />
      <NoteForm onSubmit={e => {
        e.preventDefault();
        createNote({
          variables: { input: Object.assign({}, state, { idea: ideaId }) }
        });
      }}>
        <TextField fullWidth={true} label="Note" name="body" type="text" multiline={true} variant="outlined" value={state.body} onChange={handleChange} />
        <CancelWrapper>
          <Button color="primary" variant="outlined" size="small" type="submit">
            Save
          </Button>
        </CancelWrapper>
      </NoteForm>
    </Wrapper>
  );
};

export default withUser(CreateNote);
