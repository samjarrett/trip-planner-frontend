import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Marker, InfoWindow } from 'google-maps-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Avatars from '../components/Avatars';
import Map from '../components/Map';
import Card from '../components/Card';
import Link from '../components/Link';
import withPlan from '../PlanWrapper';
import IDEA_ICONS from '../marker-icons';

const Aside = styled.aside`
  position: fixed;
  top: ${props => props.active ? "0" : "-100%"};
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: auto;

  transition: left 1000ms ease, top 1000ms ease;

  @media (min-width: 768px) {
    width: 45%;
    max-width: 450px;
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

function isAsideActiveInBrowser() {
  return window.localStorage.asideActive === "active";
}

function updateAsideActiveStatusInBrowser(asideActive) {
  window.localStorage.asideActive = asideActive ? "active" : "inactive";
}

const Plan = ({ plan }) => {
  const [asideActive, setAsideActive] = useState(isAsideActiveInBrowser());
  const [activeIdea, setActiveIdea] = useState(null);

  useEffect(() => {
    updateAsideActiveStatusInBrowser(asideActive);
  }, [asideActive]);

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
        <Fab color="primary" aria-label="add" to={`/${plan.key}/new`} component={Link}>
          <AddIcon />
        </Fab>
      </AddButtonContainer>

      <Aside active={asideActive}>
        {asideActive && <Avatars users={plan.users} />}
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
