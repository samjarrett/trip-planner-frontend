import React, { useState } from 'react';
import styled from 'styled-components';
import { Marker, InfoWindow } from 'google-maps-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Map from '../components/Map';
import Card from '../components/Card';
import withPlan from '../PlanWrapper';

const IDEA_ICONS = {
  ACCOMMODATION: "accommodation.png",
  IDEA: "pin.png",
  RESTAURANT: "restaurant.png"
}

const Aside = styled.aside`
  position: fixed;
  top: ${props => props.active ? "0" : "-100%"};
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  padding-top: 4rem;
  overflow: auto;

  transition: left 1000ms ease, top 1000ms ease;

  @media (min-width: 768px) {
    max-width: 33%;
    height: 100%;
    top: 0;
    left: ${props => props.active ? "0" : "-100%"};
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const MenuButtonContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const Plan = ({ plan }) => {
  const [asideActive, setAsideActive] = useState(false);
  const [activeIdea, setActiveIdea] = useState(null);

  const onMarkerClick = (props, marker, e) => {
    setActiveIdea({
      idea: props.idea,
      marker: marker
    });
  };

  const onInfoWindowClose = () => {
    setActiveIdea(null);
  };

  return (
    <div>
      <MenuButtonContainer>
        <Fab aria-label="menu" onClick={event => { setAsideActive(!asideActive); }}>
          <MenuIcon />
        </Fab>
      </MenuButtonContainer>
      <AddButtonContainer>
        <Fab color="primary" aria-label="add" href={`/${plan.key}/new`}>
          <AddIcon />
        </Fab>
      </AddButtonContainer>

      <Aside active={asideActive}>
        {asideActive && plan.ideas.map((idea) =>
          <Card key={idea.id} idea={idea} />
        )}
      </Aside>

      <Map latitude={plan.centerLatitude} longitude={plan.centerLongitude} zoomLevel={plan.zoomLevel}>
        {plan.ideas.map((idea) =>
          <Marker
            key={idea.id}
            onClick={onMarkerClick}
            idea={idea}
            name={idea.title}
            title={idea.title}
            position={{lat: idea.latitude, lng: idea.longitude}}
            icon={IDEA_ICONS[idea.type]} />
        )}

        <InfoWindow marker={activeIdea ? activeIdea.marker : null} visible={activeIdea !== null} onClose={onInfoWindowClose}>
          <div>
            { activeIdea &&
              <>
                <h1>{activeIdea.idea.title}</h1>
                {activeIdea.idea.description && <p>{activeIdea.idea.description}</p>}
              </>
            }
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default withPlan(Plan);
