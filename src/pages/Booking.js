import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confirmation from "../components/booking/Confirmation";

const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

export default ({ match }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState();

  const [values, setValues] = useState({
    id,
    checkIn: null,
    checkOut: null,
    guests: null,
    firstName: null,
    lastName: null,
    email: null,
    cardNumber: null,
    expiry: null,
    cvc: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState();

  const mandatoryFields = ["checkIn", "checkOut", "guests", "firstName", "lastName", "email", "cardNumber", "expiry", "cvc"];

  useEffect(async () => {
    try {
      const url = `https://lookup.search.hereapi.com/v1/lookup?id=${id}&apiKey=${HERE_API_KEY}`;
      const aspiResult = await fetch(url, { headers: { "Accept-Language": "en-US" } });

      if (!aspiResult.ok) throw "API Error";

      const hotelData = await aspiResult.json();

      setHotel({
        title: hotelData.title,
        address: (Math.random() * (30 - 1) + 1).toFixed(1),
        price: Math.floor(Math.random() * (99 - 71)) + 70,
        imageUrl: `https://source.unsplash.com/200x300/?room,bedroom,livingroom&random=${Math.random()}`,
      });
      setLoading(false);
    } catch (er) {
      setLoading(false);
      setHotel(null);
    }
  }, []);

  // change event handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!validate()) {
      return;
    }

    //Sample POST
    // await fetch("https://example.com", { method: "POST", body: JSON.stringify(values) });

    setSubmitted(true);
  };

  const validate = () => {
    const tempErrors = {};
    let hasError;

    for (const key in values) {
      if (mandatoryFields.includes(key)) {
        if (!values[key]) {
          tempErrors[key] = "This field is required.";
          hasError = true;
        }
      }
    }

    setErrors(tempErrors);
    return !hasError;
  };

  return (
    <div className="Booking container">
      {hotel && (
        <Fragment>
          <div className="hotel">
            <div className="cols flex">
              <div className="col image-container" style={{ backgroundImage: `url("${hotel.imageUrl}")` }} />

              <div className="col flex">
                <div>
                  <h2>{hotel.title}</h2>
                  <h5>{hotel.address} from the city center</h5>
                </div>
                <div>
                  <h3>£{hotel.price}</h3>
                  <small>Designs may vary</small>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <form noValidate onSubmit={(e) => submitHandler(e)}>
            <section>
              <h3>Booking Info</h3>

              <div className={`control ${errors["checkIn"] ? "error" : ""}`}>
                <label htmlFor="checkIn">Check In</label>
                <input type="date" id="checkIn" name="checkIn" placeholder="Check In" onChange={(e) => inputHandler(e)} />
                {errors["checkIn"] && <span className="error-text">{errors["checkIn"]}</span>}
              </div>

              <div className={`control ${errors["checkOut"] ? "error" : ""}`}>
                <label htmlFor="checkOut">Check Out</label>
                <input type="date" id="checkOut" name="checkOut" placeholder="Checkout Out" onChange={(e) => inputHandler(e)} />
                {errors["checkOut"] && <span className="error-text">{errors["checkOut"]}</span>}
              </div>

              <div className={`control ${errors["guests"] ? "error" : ""}`}>
                <label htmlFor="guests">Guests</label>
                <input type="number" id="guests" name="guests" placeholder="1" onChange={(e) => inputHandler(e)} />
                {errors["guests"] && <span className="error-text">{errors["guests"]}</span>}
              </div>
            </section>

            <section>
              <h3>Personal Info</h3>

              <div className={`control ${errors["firstName"] ? "error" : ""}`}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John" onChange={(e) => inputHandler(e)} />
                {errors["firstName"] && <span className="error-text">{errors["firstName"]}</span>}
              </div>

              <div className={`control ${errors["lastName"] ? "error" : ""}`}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Doe" onChange={(e) => inputHandler(e)} />
                {errors["lastName"] && <span className="error-text">{errors["lastName"]}</span>}
              </div>

              <div className={`control ${errors["email"] ? "error" : ""}`}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" onChange={(e) => inputHandler(e)} />
                {errors["email"] && <span className="error-text">{errors["email"]}</span>}
              </div>
            </section>

            <section>
              <h3>Payment</h3>
              <div className={`control ${errors["cardNumber"] ? "error" : ""}`}>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" placeholder="1111-2222-3333-4444" onChange={(e) => inputHandler(e)} />
                {errors["cardNumber"] && <span className="error-text">{errors["cardNumber"]}</span>}
              </div>

              <div className={`control ${errors["expiry"] ? "error" : ""}`}>
                <label htmlFor="expiry">Expiry</label>
                <input type="expiry" id="expiry" name="expiry" placeholder="MM/YY" onChange={(e) => inputHandler(e)} />
                {errors["expiry"] && <span className="error-text">{errors["expiry"]}</span>}
              </div>

              <div className={`control ${errors["cvc"] ? "error" : ""}`}>
                <label htmlFor="cvc">CVC</label>
                <input type="cvc" id="cvc" name="cvc" placeholder="123" onChange={(e) => inputHandler(e)} />
                {errors["cvc"] && <span className="error-text">{errors["cvc"]}</span>}
              </div>
            </section>

            <button className="btn" type="submit">
              Confirm
            </button>
          </form>
        </Fragment>
      )}

      {!hotel && loading && <div>Loading...</div>}

      {!hotel && !loading && (
        <div>
          Something went wrong. Go back to <Link to="/">homepage</Link>.
        </div>
      )}

      {submitted && <Confirmation />}
    </div>
  );
};
