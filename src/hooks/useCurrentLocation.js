import {useEffect, useState} from 'react';

export default () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 60000, //1 minute
    maximumAge: 3600000, //1 hour
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  const handleSuccess = position => {
    const {latitude, longitude} = position.coords;
    setLocation({lat: latitude, lng: longitude});
  };

  const handleError = error => {
    setLocation(null);
    setError(error.message);
  };

  return {location, error};
};
