import React, { useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import Link from './Link';
import Note from './Note';
import CreateNote from './CreateNote';


const Modal = styled.div`
  position: fixed;
  top: calc(25vh / 2);
  z-index: 1000;
  width: 470px;
  max-width: 100%;
  height: 75vh;
  max-height: calc(100vh - 8rem);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  padding: 1rem;
  overflow: auto;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const BackButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const ShowIdeaModal = ({ google, map, idea, planKey }) => {
  useEffect(() => {
    if (!map) {
      return;
    }

    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId: idea.googlePlaceId }, (place, status) => {
      console.log(status);
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
    });
  }, [idea.googlePlaceId, map, google]);

  let i = 0;
  return (
    <Modal>
      <h2>{idea.title}</h2>
      { idea.description &&
        idea.description.split("\n").map((item) =>
            <p key={++i}>{item}</p>
        )
      }

      <CreateNote />

      {idea.notes.map((note) =>
        <Note note={note} />
      )}

      <BackButtonContainer>
        <Fab color="primary" aria-label="add" to={`/${planKey}`} component={Link}>
          <ArrowBack />
        </Fab>
      </BackButtonContainer>
    </Modal>
  );
};

export default ShowIdeaModal;
