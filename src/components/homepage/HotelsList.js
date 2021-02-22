import Slider from '../shared/Slider';
import HotelItem from './HotelItem';
export default ({hotels, selectedIndex, onSlide}) => {
  return (
    <div className="HotelsList">
      <Slider selectedIndex={selectedIndex} onSlide={onSlide}>
        {hotels && hotels.map(hotel => <HotelItem key={hotel.id} hotel={hotel} />)}
      </Slider>
    </div>
  );
};
