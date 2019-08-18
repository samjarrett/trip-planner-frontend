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
    }
  }
`;

export default GET_PLAN_QUERY;
