import { gql } from 'apollo-boost';

const GET_PLAN_QUERY = gql`
  query getPlan($key: String!) {
    plan(key: $key) {
      id
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
