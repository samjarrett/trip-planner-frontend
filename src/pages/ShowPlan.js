import React, { useState } from 'react';
import styled from 'styled-components';
import { Marker } from 'google-maps-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Map from '../components/Map';
import Link from '../components/Link';
import Debug from '../components/MapDebug';
import PlanAside from '../components/PlanAside';
import withPlan from '../PlanWrapper';
import IDEA_ICONS from '../marker-icons';
import filterIdeas from '../utils/idea-filter';

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const Plan = ({ plan, history }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const onMarkerClick = (props) => {
    history.push(`/${plan.key}/${props.idea.id}`)
  };

  const ideas = filterIdeas(activeFilter, plan.ideas);

  return (
    <div>
      <AddButtonContainer>
        <Fab color="primary" aria-label="add" to={`/${plan.key}/new`} component={Link}>
          <AddIcon />
        </Fab>
      </AddButtonContainer>

      <PlanAside plan={plan} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <Map latitude={plan.centerLatitude} longitude={plan.centerLongitude} zoomLevel={plan.zoomLevel}>
        {ideas.map((idea) =>
          <Marker
            key={idea.id}
            onClick={onMarkerClick}
            idea={idea}
            title={idea.title}
            position={{ lat: idea.latitude, lng: idea.longitude }}
            icon={IDEA_ICONS[idea.type]} />
        )}
        <Debug />
      </Map>
    </div>
  );
}

export default withPlan(Plan);
