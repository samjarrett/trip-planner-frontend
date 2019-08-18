import React from 'react';
import withPlan from '../PlanWrapper';
import Map from '../components/Map';
import CreateIdeaModal from '../components/CreateIdeaModal';


const CreateIdea = ({ plan }) => {
  return (
    <Map latitude={plan.centerLatitude} longitude={plan.centerLongitude} zoomLevel={plan.zoomLevel}>
      <CreateIdeaModal plan={plan} />
    </Map>
  );
}

export default withPlan(CreateIdea);
