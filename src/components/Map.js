import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MAP_STYLE = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const mapStyle = {

}
const containerStyle = {
  width: '75%',
  left: '25%'
}

export const MapContainer = ({ children, latitude, longitude, zoomLevel, loaded, google}) => {
  const initialCenter = {
    lat: latitude,
    lng: longitude
  };

  return (
    <Map google={google}
         initialCenter={initialCenter}
         zoom={zoomLevel}
         mapType="ROADMAP"
         mapTypeControl={false}
         streetViewControl={false}
         fullscreenControl={false}
         styles={MAP_STYLE}
         style={mapStyle}
         containerStyle={containerStyle}
    >
      {children}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYa21b6I5L0y_aQMVUIdS6FNXQW9M2f-s'
})(MapContainer)
