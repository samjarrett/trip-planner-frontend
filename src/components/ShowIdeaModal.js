import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './LeftSideModal';
import Title from './Title';
import Note from './Note';
import CreateNote from './CreateNote';

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

      <Title topMargin={images.length > 0}>{idea.title}</Title>

      { idea.description &&
        idea.description.split("\n").map((item) =>
            <p key={++i}>{item}</p>
        )
      }

      <CreateNote ideaId={idea.id} />

      {idea.notes.map((note) =>
        <Note key={note.id} note={note} />
      )}
    </Modal>
  );
};

export default ShowIdeaModal;
