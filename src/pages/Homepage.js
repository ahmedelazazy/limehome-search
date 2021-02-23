import {Fragment, useEffect, useState} from 'react';
import HotelsList from '../components/homepage/HotelsList';
import Map from '../components/homepage/Map';
import Loader from '../components/shared/Loader';
import useCurrentLocation from '../hooks/useCurrentLocation';
import {getHotelsByLocation} from '../services/hotels';

export default () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHotelLocation, setSelectedHotelLocation] = useState();

  const {location: currentLocation} = useCurrentLocation();

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  const getHotels = async location => {
    try {
      setLoading(true);

      const _hotels = await getHotelsByLocation(location);
      setSelectedIndex(0);
      setSelectedHotelLocation(_hotels.position);
      setHotels(_hotels);
      setLoading(false);
    } catch (err) {
      setHotels([]);
      setLoading(false);
      setError(true);
    }
  };

  const hotelSelected = index => {
    setSelectedIndex(index);
    setSelectedHotelLocation(hotels[index].position);
    setLocation(hotels[index].position);
  };

  return (
    <div className="Homepage container">
      {!error && (
        <Fragment>
          <Map
            hotels={hotels}
            getHotels={getHotels}
            location={location}
            onMarkerSelected={hotelSelected}
            selectedIndex={selectedIndex}
            selectedHotelLocation={selectedHotelLocation}
          />
          <HotelsList hotels={hotels} onSlide={hotelSelected} selectedIndex={selectedIndex} />
        </Fragment>
      )}

      {loading && <Loader />}

      {error && (
        <p className="error" data-testid="error">
          Something went wrong. Please <a href="/">refresh</a> try again later.
        </p>
      )}
    </div>
  );
};
