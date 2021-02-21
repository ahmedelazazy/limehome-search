import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="Confirmation">
      <div className="modal">
        <h1>Thank You!</h1>
        <p>You booking has been confirmed.</p>
        <Link to="/">Close</Link>
      </div>
    </div>
  );
};
