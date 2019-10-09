import React, { useState, useEffect } from 'react';
import Snack from '../components/Snack';

const Debug = ({ map }) => {
  const [active, setActive] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: '', lng: '', zoom: 0 });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setActive(false);
  };

  useEffect(() => {
    const DEBUG_ACTIVATION_KEY = 'Shift';

    const onKeyDown = (event) => {
      if (!active && event.key === DEBUG_ACTIVATION_KEY) {
        setActive(true);
      }
    }
    document.addEventListener('keydown', onKeyDown);

    if (map) {
      map.addListener('idle', () => setMapPosition({
        lat: map.center.lat(),
        lng: map.center.lng(),
        zoom: map.zoom
      }));
    }

    return () => {
      document.removeEventListener('keydown', (onKeyDown));
    };
  }, [map, active]);

  if (!active) {
    return null;
  }

  return (
    <Snack open={active} handleClose={handleClose}>
      lat: {mapPosition.lat} / long: {mapPosition.lng} / zoom: {mapPosition.zoom}
    </Snack>
  );
};
export default Debug;
