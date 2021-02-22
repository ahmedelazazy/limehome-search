import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="NotFound page">
      <div className="container">
        <section>
          <h2>Page Not Found</h2>
          <p>
            Go back to <Link to="/">homepage.</Link>
          </p>
        </section>
      </div>
    </div>
  );
};
