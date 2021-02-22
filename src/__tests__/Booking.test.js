// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Booking from "../pages/Booking";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders booking data with valid id", async () => {
  const fakeBooking = {
    title: "Berlin Hotel",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeBooking),
      ok: true,
    })
  );

  const match = {
    params: {
      id: 1,
    },
  };

  await act(async () => {
    render(<Booking match={match} />, container);
  });

  expect(container.querySelector('[data-testid="booking-info-label"]').textContent).toEqual("Booking Info");

  global.fetch.mockRestore();
});

it("renders error with invalid booking id", async () => {
  const fakeBooking = {
    title: "Berlin Hotel",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeBooking),
      ok: true,
    })
  );

  const match = {
    params: {},
  };

  await act(async () => {
    render(
      <BrowserRouter>
        <Booking match={match} />
      </BrowserRouter>,
      container
    );
  });

  expect(container.querySelector('[data-testid="error"]')).toBeInTheDocument();

  global.fetch.mockRestore();
});

it("renders error when API responds with not ok", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  const match = {
    params: {
      id: 1,
    },
  };

  await act(async () => {
    render(
      <BrowserRouter>
        <Booking match={match} />
      </BrowserRouter>,
      container
    );
  });

  expect(container.querySelector('[data-testid="error"]')).toBeInTheDocument();

  global.fetch.mockRestore();
});

it("renders error when API responds with an error", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject());

  const match = {
    params: {
      id: 1,
    },
  };

  await act(async () => {
    render(
      <BrowserRouter>
        <Booking match={match} />
      </BrowserRouter>,
      container
    );
  });

  expect(container.querySelector('[data-testid="error"]')).toBeInTheDocument();

  global.fetch.mockRestore();
});
