import {useEffect, useRef} from 'react';
import Slider from 'react-slick';

export default ({children, onSlide, selectedIndex}) => {
  const slider = useRef();

  useEffect(() => {
    slider.current.slickGoTo(selectedIndex);
  }, [selectedIndex]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,

    afterChange: index => {
      onSlide(index);
    },
  };

  return (
    <Slider ref={slider} {...settings}>
      {children}
    </Slider>
  );
};
