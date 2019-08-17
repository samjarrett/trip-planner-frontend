import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Marker } from 'google-maps-react';
import GET_PLAN_QUERY from '../queries/get-plan';
import Map from './Map';
import Card from './Card';

const IDEA_ICONS = {
  ACCOMMODATION: "accommodation.png",
  IDEA: null
}

const Aside = styled.aside`
  width: 25%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
`;

const Plan = ({ match }) => {
  const { data: { plan }, error, loading } = useQuery(GET_PLAN_QUERY, { variables: { key: match.params.key } });

  if (loading) return null;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Aside>
        {plan.ideas.map((idea) =>
          <Card
            key={idea.id}
            idea={idea} />
        )}
      </Aside>
      <Map latitude={plan.centerLatitude} longitude={plan.centerLongitude} zoomLevel={plan.zoomLevel}>
        {plan.ideas.map((idea) =>
          <Marker
            key={idea.id}
            name={idea.title}
            title={idea.title}
            position={{lat: idea.latitude, lng: idea.longitude}}
            icon={IDEA_ICONS[idea.type]} />
        )}
      </Map>
    </div>
  );
}

export default Plan;
