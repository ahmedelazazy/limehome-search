import { useEffect, useState } from "react";
import HotelsList from "../components/homepage/HotelsList";
import Map from "../components/homepage/Map";
import useCurrentLocation from "../hooks/useCurrentLocation";

export default () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [location, setLocation] = useState();

  const { location: currentLocation } = useCurrentLocation();
  const BERLIN_LOCATION = { lat: 52.5677685, lng: 13.3328635 };
  const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    } else {
      setLocation(BERLIN_LOCATION);
    }
  }, [currentLocation]);

  const getHotels = async (location) => {
    const url = `https://discover.search.hereapi.com/v1/discover?at=${location.lat},${location.lng}&q=hotels&lang=en-US&apiKey=${HERE_API_KEY}`;
    const aspiResult = await fetch(url, { headers: { "Accept-Language": "en-US" } });
    const hotelsData = await aspiResult.json();

    const mappedHotels = hotelsData.items.map((hotel) => ({
      id: hotel.id,
      title: hotel.title,
      position: hotel.position,
      address: (Math.random() * (30 - 1) + 1).toFixed(1),
      price: Math.floor(Math.random() * (99 - 71)) + 70,
      imageUrl: `https://source.unsplash.com/200x300/?room,bedroom,livingroom&random=${Math.random()}`,
    }));

    setSelectedHotel(mappedHotels[0].id);
    setHotels(mappedHotels);
  };

  return (
    <div className="Homepage container">
      <Map hotels={hotels} getHotels={getHotels} location={location} onHotelSelected={setSelectedHotel} selectedHotel={selectedHotel} />
      <HotelsList hotels={hotels} onSlide={setSelectedHotel} selectedHotel={selectedHotel} />
    </div>
  );
};
