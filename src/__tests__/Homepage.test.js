// contact.test.js

import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import HotelsList from '../components/homepage/HotelsList';

jest.mock('../components/shared/Slider.js', () => {
  return function DummySlider({children}) {
    return <div>{children}</div>;
  };
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render hotel list', () => {
  const hotels = [{id: 1, title: 'Hotel 1', address: 3, price: '100', currency: '£'}];

  act(() => {
    render(
      <BrowserRouter>
        <HotelsList hotels={hotels} />
      </BrowserRouter>,
      container
    );
  });

  expect(container.querySelector('h2').textContent).toEqual(hotels[0].title);
  expect(container.querySelector('h5').textContent).toEqual(
    `${hotels[0].address} from the city center`
  );
  expect(container.querySelector('h3').textContent).toEqual(
    `${hotels[0].currency}${hotels[0].price}`
  );
  expect(container.querySelector('small').textContent).toEqual('Designs may vary');
  expect(container.querySelector('a').getAttribute('href')).toEqual(`/book/${hotels[0].id}`);
});
