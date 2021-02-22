import {Link} from 'react-router-dom';

export default ({open, setOpen}) => {
  return (
    <div className={`Slider ${open ? 'open' : ''}`} open={open}>
      <div className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
