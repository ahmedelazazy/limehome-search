import { useEffect, useRef } from "react";
import Slider from "react-slick";
import HotelItem from "./HotelItem";

export default ({ hotels, selectedHotel, onSlide }) => {
  const slider = useRef();

  useEffect(() => {
    let index = hotels.findIndex((h) => h.id === selectedHotel);

    slider.current.slickGoTo(index);
  }, [selectedHotel]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,

    afterChange: (index) => {
      onSlide(hotels[index].id);
    },
  };

  return (
    <div className="HotelsList">
      <Slider ref={slider} {...settings}>
        {hotels && hotels.map((hotel) => <HotelItem key={hotel.id} hotel={hotel} />)}
      </Slider>
    </div>
  );
};
