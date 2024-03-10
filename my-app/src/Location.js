import React, { useState, useEffect } from 'react';

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div>
      <h2>Current Location:</h2>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude} <br></br>
          Longitude: {position.longitude}
        </p>
      ) : (
        <p>Blocked By User. Allow location data to see current coordinates.</p>
      )}
    </div>
  );
}

export default MyLocation;
