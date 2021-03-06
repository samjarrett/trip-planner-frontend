import { gql } from '@apollo/client';

const GET_PLAN_QUERY = gql`
  query getPlan($key: String!) {
    plan(key: $key) {
      id
      title
      key
      centerLatitude
      centerLongitude
      zoomLevel

      ideas {
        id
        title
        description
        type
        latitude
        longitude
        googlePlaceId
      }

      users {
        id
        firstName
        lastName
        gravatarHash
      }
    }
  }
`;

export default GET_PLAN_QUERY;
