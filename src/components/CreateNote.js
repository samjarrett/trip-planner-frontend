import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Avatar from './Avatar';
import withUser from '../withUser';


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

const CreateNote = ({ user }) => (
  <Wrapper>
    <Avatar user={user} />
    <NoteForm>
      <TextField fullWidth={true} label="Note" name="body" type="text" multiline={true} variant="outlined" />
      <CancelWrapper>
        <Button color="primary" variant="outlined" size="small" type="submit">
          Save
        </Button>
      </CancelWrapper>
    </NoteForm>
  </Wrapper>
);

export default withUser(CreateNote);
