import GoogleMapReact from "google-map-react";
import React from "react";
import MapMarker from "./MapMarker";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOLE_MAP_API_KEY;

export default ({ hotels, getHotels, location, onHotelSelected, selectedHotel }) => {
  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
  };

  const onChange = async ({ center }) => {
    await getHotels(center);
  };

  return (
    <div className="Map">
      <GoogleMapReact bootstrapURLKeys={{ key: GOOGLE_API_KEY }} center={location} defaultZoom={15} onChange={onChange} onChildClick={(index, { id }) => onHotelSelected(id)} zoomControl={false} options={mapOptions}>
        {hotels && hotels.map((hotel, i) => <MapMarker key={i} lat={hotel.position.lat} lng={hotel.position.lng} id={hotel.id} active={hotel.id == selectedHotel} />)}
      </GoogleMapReact>
    </div>
  );
};
