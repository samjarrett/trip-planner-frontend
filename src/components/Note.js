import React from 'react';
import Paper from '@material-ui/core/Paper';
import MUIChip from '@material-ui/core/Chip';
import styled from 'styled-components';
import speedDate from 'speed-date';
import Avatar from './Avatar';

const dateFormatter = speedDate('MMMM D, YYYY [at] h:mma');

const Wrapper = styled(Paper)`
  margin: 1rem 0;
  padding: 1rem 1rem 0.5rem 1rem;
`;

const Card = styled.div`
  display: flex;
  align-items: baseline;
`;

const Body = styled.p`
  margin-left: 1rem;
  flex-grow: 1;
`;

const Chip = styled(MUIChip)`
  margin-right: auto;
`;

const DateLine = styled.time`
  color: #666;
  font-size: 0.7rem;
  display: block;
  text-align: right;
`;

const Note = ({ note }) => (
  <Wrapper>
    <Card key={note.id}>
      <Avatar user={note.creator} />
      <Body>{note.body}</Body>
      {note.automated && <Chip variant="outlined" size="small" label="Auto" />}
    </Card>
    <DateLine dateTime={note.created}>{dateFormatter(new Date(note.created))}</DateLine>
  </Wrapper>
);
export default Note;
