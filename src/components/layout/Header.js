import {useState} from 'react';
import Burger from './Burger';
import Slider from './Slider';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="Header">
      <div className="container">
        <div className="bar">
          <div className="logo" />
          <Burger open={open} setOpen={setOpen} />
          <Slider open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};
