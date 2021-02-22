# Limehome Search

A simple page which shows the nearby hotels to the current location on a map.

User has the option to make a dummy reservation to the selected hotel.

The application is developed in **React** and SASS is used for styling.

## Demo

https://limehome-search.netlify.app/

## Application Flow Explained

### Home Page

- It shows a map centered at the current location
- If the current location cannot be retrieved, the default location will be used. It is currently set to Berlin
- It gets the nearby hotels from HERE API
- The retrived hotels will be displayed on the map
- Also they will be displayed in a slider
- When the user select a hotel from the map, the slider will move to the selected hotel
- When the user select a hotel from the slider, the map will move to the selected hotel
- When the user move the map, it will load new hotels, at the new selected location and show them on the map and update the slider
- Fetching new hotels is staled so that if the user keeps moving the map, only call the API when being idle
- When user click on Booking, it will redirect to the Booking page

**Notes**

Since the HERE API does not retrieve hotel images, price and distance to city. So the app is showing placeholders for these fields. In real world application, the hotels list along with its fields will be fetched from another API and then showed on the map.

### Booking

- A basic form with the most common booking data fields
- The page will try to load the given hotel from HERE API, so that the booking link is a stateless URL and can be shared
- If the hotel cannot be retrieved, an error message will be displayed
- A basic validation is added. Only checking for required fields and string formats. In a real world application, more validations will be needed and most probably will use a thrid-party validation library
- When the user fill the fields, a confirmation pop up will be displayed

### Layout

- To follow the provided design which has a burger menu, I added a slider to have the navigation links when clicking on the burger icon
- So there is a dummy About page just to have some links in the navigation menu

### APIs

- [HERE Discove API](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/quick-start.html) is used to get the near by hotels

- [HERE Lookup API](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-lookup-brief.html) is used to get the details of a selected hotel

### API Keys

- HERE API key is required to be set in `.env`
- Google Maps API Key is required to be set in `.env`

### Used Third Party Packages

- [React](https://www.npmjs.com/package/react)
- [React Router](https://www.npmjs.com/package/react-router-dom)
- [SASS](https://www.npmjs.com/package/node-sass)
- [Google Map React](https://www.npmjs.com/package/google-map-react)
- [React Slick](https://www.npmjs.com/package/react-slick)
- [Debounce](https://www.npmjs.com/package/debounce)

### Getting Started

- Clone the repo
- Copy `.env.example` to `.env`
- Update the API keys values
- Run `npm start`

### Test

- Run `npm run test`

### Deploy

- run `npm run build`
