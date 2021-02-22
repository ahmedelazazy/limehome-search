import { Link } from "react-router-dom";

export default ({ hotel }) => {
  return (
    <div className="HotelItem">
      <div className="cols flex">
        <div className="col image-container" style={{ backgroundImage: `url("${hotel.imageUrl}")` }} />

        <div className="col flex">
          <div>
            <h2>{hotel.title}</h2>
            <h5>{hotel.address} from the city center</h5>
          </div>
          <div>
            <h3>
              {hotel.currency}
              {hotel.price}
            </h3>
            <small>Designs may vary</small>
          </div>
        </div>
      </div>
      <Link className="btn" to={`/book/${hotel.id}`}>
        Book
      </Link>
    </div>
  );
};
