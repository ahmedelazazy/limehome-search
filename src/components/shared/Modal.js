import {Link} from 'react-router-dom';

export default ({title, children, link}) => {
  return (
    <div className="Modal">
      <div className="modal-container">
        <h1>{title}</h1>
        {children}
        <Link className="btn" to={link}>
          Close
        </Link>
      </div>
    </div>
  );
};
