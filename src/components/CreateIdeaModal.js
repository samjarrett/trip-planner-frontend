import React, { useRef, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import { Marker } from 'google-maps-react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Link from './Link';
import Modal from './LeftSideModal';
import Title from './Title';
import IDEA_ICONS from '../marker-icons';

import GET_PLAN_QUERY from '../queries/get-plan';
import CREATE_IDEA_MUTATION from '../queries/create-idea';

const DEFAULT_STATE = {
  type: 'idea',
  title: '',
  description: ''
};

const CancelButton = styled(Button)`
  float: right;
`;

function convertStateToInput(plan, state) {
  return {
    plan: plan.id,
    title: state.title || state.placeName,
    type: state.type,
    description: state.description,
    latitude: state.latitude,
    longitude: state.longitude,
    googlePlaceId: state.googlePlaceId
  };
}

const CreateIdeaModal = withRouter((props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const autocompleteEl = useRef(null);
  const { google, map, history, plan } = props;
  const planKey = plan.key;
  const [createIdea] = useMutation(CREATE_IDEA_MUTATION, {
    update(cache, { data: { createIdea } }) {
      const { plan } = cache.readQuery({ query: GET_PLAN_QUERY, variables: { key: planKey } });
      const ideas = [createIdea.idea].concat(plan.ideas);

      cache.writeQuery({
        query: GET_PLAN_QUERY,
        variables: { key: planKey },
        data: { plan: {
          ...plan,
          ideas
        } },
      });
    },
    onCompleted: () => {
      history.push(`/${plan.key}`);
    }
  });

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  }

  useEffect(() => {
    if (!map) {
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(autocompleteEl.current);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      setState({
        ...state,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        googlePlaceId: place.place_id,
        placeName: place.name
      });

      if (!map) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    });
  }, [map, google.maps.places.Autocomplete, state]);

  return (
    <Modal>
      <Title>Create a new idea</Title>
      <form onSubmit={e => {
        e.preventDefault();
        createIdea({
          variables: { input: convertStateToInput(plan, state) }
        });
      }}>
        <TextField fullWidth={true} label="Search for a location" inputRef={autocompleteEl} type="text" autoComplete="false" />
        <TextField fullWidth={true} label="Idea title" name="title" type="text" defaultValue={state.placeName} placeholder={state.placeName} value={state.title} onChange={handleChange} />
        <TextField fullWidth={true} label="Description (optional)" name="description" type="text" multiline={true} value={state.description} onChange={handleChange} />
        <FormControl component="fieldset">
          <RadioGroup name="type" value={state.type} onChange={handleChange} row>
            <FormControlLabel
              value="idea"
              control={<Radio color="primary" />}
              label="Idea"
              labelPlacement="end"
            />
            <FormControlLabel
              value="accommodation"
              control={<Radio color="primary" />}
              label="Accommodation"
              labelPlacement="end"
            />
            <FormControlLabel
              value="restaurant"
              control={<Radio color="primary" />}
              label="Restaurant"
              labelPlacement="end"
            />
            <FormControlLabel
              value="shopping"
              control={<Radio color="primary" />}
              label="Shopping"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
          <CancelButton color="secondary" to={`/${plan.key}`} component={Link}>Cancel</CancelButton>
        </div>
      </form>
      { state.googlePlaceId && <Marker google={google} map={map} position={{lat: state.latitude, lng: state.longitude}} icon={IDEA_ICONS[state.type.toUpperCase()]} />}
    </Modal>
  );
});

export default CreateIdeaModal;
