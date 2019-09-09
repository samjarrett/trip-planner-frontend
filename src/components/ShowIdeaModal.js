import React, { useEffect, useState } from 'react';
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

const CoverImage = styled.img`
  display: block;
  // break out of the padding
  margin-top: -1rem;
  margin-left: -1rem;
  width: calc(100% + 2rem);

  max-height: 100px;
  object-fit: cover;
  object-position: center center;

  :hover {
    cursor: pointer;
    max-height: 50vh;
  }

  transition: max-height 0.3s ease-in;
`;

const BackButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const ShowIdeaModal = ({ google, map, idea, planKey }) => {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleCoverImageClick = () => {
    let newImageIndex = imageIndex + 1;
    if (!images[newImageIndex]) {
      newImageIndex = 0;
    }
    setImageIndex(newImageIndex);
  }

  useEffect(() => {
    if (!map) {
      return;
    }

    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId: idea.googlePlaceId }, (place, status) => {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }

      if (place.photos) {
        setImages(place.photos);
      }
    });
  }, [idea.googlePlaceId, map, google]);

  let i = 0;
  return (
    <Modal>
      { images.length > 0 &&
        <CoverImage src={images[imageIndex].getUrl()} onClick={handleCoverImageClick}/>
      }

      <h2>{idea.title}</h2>

      { idea.description &&
        idea.description.split("\n").map((item) =>
            <p key={++i}>{item}</p>
        )
      }

      <CreateNote />

      {idea.notes.map((note) =>
        <Note key={note.id} note={note} />
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
