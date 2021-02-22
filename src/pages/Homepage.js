import {Fragment, useEffect, useState} from 'react';
import HotelsList from '../components/homepage/HotelsList';
import Map from '../components/homepage/Map';
import Loader from '../components/shared/Loader';
import useCurrentLocation from '../hooks/useCurrentLocation';
import {HERE_API_KEY} from '../utils/constants';

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
      const url = `https://discover.search.hereapi.com/v1/discover?at=${location.lat},${location.lng}&q=hotels&lang=en-US&apiKey=${HERE_API_KEY}`;
      const aspiResult = await fetch(url, {
        headers: {'Accept-Language': 'en-US'},
      });
      const hotelsData = await aspiResult.json();

      //The HERE API only returns hotel name and location, so I am adding placeholders for the image, price, currency and distance from center.
      //In real world app, will get the list of hotels along with its fields from another API and then plot it on the map
      const mappedHotels = hotelsData.items.map(hotel => ({
        id: hotel.id,
        title: hotel.title,
        position: hotel.position,
        address: (Math.random() * (30 - 1) + 1).toFixed(1),
        price: Math.floor(Math.random() * (99 - 71)) + 70,
        currency: '£',
        imageUrl: `https://source.unsplash.com/200x300/?room,bedroom,livingroom&random=${Math.random()}`,
      }));

      setSelectedIndex(0);
      setSelectedHotelLocation(mappedHotels[0].position);
      setHotels(mappedHotels);
      setLoading(false);
    } catch (err) {
      setHotels([]);
      setLoading(false);
      setError(true);

      console.error(err);
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
