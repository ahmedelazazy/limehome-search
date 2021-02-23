import {HERE_API_KEY} from '../utils/constants';

const hereAPIHeaders = {
  headers: {'Accept-Language': 'en-US'},
};

export const getHotelsByLocation = async location => {
  const url = `https://discover.search.hereapi.com/v1/discover?at=${location.lat},${location.lng}&q=hotels&lang=en-US&apiKey=${HERE_API_KEY}`;
  const aspiResult = await fetch(url, hereAPIHeaders);

  if (!aspiResult.ok) throw 'API Error';

  const hotelsData = await aspiResult.json();

  //The HERE API only returns hotel name and location, so I am adding placeholders for the image, price, currency and distance from center.
  //In real world app, will get the list of hotels along with its fields from another API and then plot it on the map
  return hotelsData.items.map(hotel => fillHotelFields(hotel));
};

export const getHotelById = async id => {
  const url = `https://lookup.search.hereapi.com/v1/lookup?id=${id}&apiKey=${HERE_API_KEY}`;
  const aspiResult = await fetch(url, hereAPIHeaders);

  if (!aspiResult.ok) throw 'API Error';

  const hotelData = await aspiResult.json();

  //The HERE API only returns hotel name and location, so I am adding placeholders for the image, price, currency and distance from center.
  //In real world app, will get the hotel fields from another API
  return fillHotelFields(hotelData);
};

const fillHotelFields = hotel => ({
  id: hotel.id,
  title: hotel.title,
  position: hotel.position,
  address: (Math.random() * (30 - 1) + 1).toFixed(1),
  price: Math.floor(Math.random() * (99 - 71)) + 70,
  currency: '£',
  imageUrl: `https://source.unsplash.com/200x300/?room,bedroom,livingroom&random=${Math.random()}`,
});
