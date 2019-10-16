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
  }
];

const mapStyle = {

}
const containerStyle = {
  // width: '75%',
  // left: '25%'
}

export const MapContainer = ({ children, latitude, longitude, zoomLevel, visible = true, google }) => {
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
         visible={visible}
    >
      {children}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(MapContainer)
