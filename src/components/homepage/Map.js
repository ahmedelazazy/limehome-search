import {debounce} from 'debounce';
import GoogleMap from 'google-map-react';
import React from 'react';
import {DEFAULT_LOCATION, GOOGLE_API_KEY} from '../../utils/constants';
import MapMarker from './MapMarker';

export default ({
  hotels,
  getHotels,
  location,
  onMarkerSelected,
  selectedIndex,
  selectedHotelLocation,
}) => {
  //debouncing the API call when user is moving the map multiple times
  const staleGetHotels = debounce(getHotels, 250);

  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
  };

  const onChange = async ({center}) => {
    if (
      center?.lat.toFixed(5) !== selectedHotelLocation?.lat.toFixed(5) ||
      center?.lng.toFixed(5) !== selectedHotelLocation?.lng.toFixed(5)
    ) {
      staleGetHotels(center);
    }
  };

  return (
    <div className="Map">
      <GoogleMap
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{key: GOOGLE_API_KEY}}
        center={location || DEFAULT_LOCATION}
        defaultZoom={15}
        onChange={onChange}
        onChildClick={onMarkerSelected}
        zoomControl={false}
        options={mapOptions}
      >
        {hotels &&
          hotels.map((hotel, i) => (
            <MapMarker
              key={i}
              lat={hotel.position.lat}
              lng={hotel.position.lng}
              id={hotel.id}
              active={i == selectedIndex}
            />
          ))}
      </GoogleMap>
    </div>
  );
};
