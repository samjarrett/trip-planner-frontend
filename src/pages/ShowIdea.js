import React from 'react';
import { Marker } from 'google-maps-react';
import withIdea from '../withIdea';
import Map from '../components/Map';
import ShowIdeaModal from '../components/ShowIdeaModal';
import BackButton from '../components/BackButton';
import IDEA_ICONS from '../marker-icons';

const ShowIdea = ({ idea, match, map }) => {
  const planKey = match.params.key;

  return (
    <Map latitude={idea.latitude} longitude={idea.longitude} zoomLevel={17}>
      <Marker
        position={{lat: idea.latitude, lng: idea.longitude}}
        icon={IDEA_ICONS[idea.type]}
        />
      <ShowIdeaModal idea={idea} planKey={planKey} />
      <BackButton url={`/${planKey}`}/>
    </Map>
  );
}

export default withIdea(ShowIdea);
