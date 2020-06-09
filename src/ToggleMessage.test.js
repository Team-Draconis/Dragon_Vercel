import React from "react";

import { render, fireEvent } from "@testing-library/react";
import ToggleMessage from "./ToggleMessage";
import "@testing-library/jest-dom/extend-expect";

test("Toggle message should be set data-testid='toggle'", () => {
  const { queryByTestId } = render(<ToggleMessage />);

  const toggle = queryByTestId("toggle");
  expect(toggle).toBeInTheDocument();
});

test("Toggle message should be set data-testid='text'", () => {
  const { queryByTestId } = render(<ToggleMessage />);

  const toggle = queryByTestId("toggle");
  fireEvent.click(toggle);

  const text = queryByTestId("text");
  expect(text).toBeInTheDocument();
});

test("Toggle message 'Want to buy a new car?' should be displayed on the page", () => {
  const { getByText } = render(<ToggleMessage />);

  const toggle = getByText("Want to buy a new car?");
  expect(toggle).toBeInTheDocument();
});

test("At the start, 'Call +11 22 33 44 now!' should not be visible", () => {
  const { queryByTestId } = render(<ToggleMessage />);
  const text = queryByTestId("text");
  expect(text).not.toBeInTheDocument();
});

test("After clicking toggle message, 'Call +11 22 33 44 now!' should be visible", () => {
  const { queryByTestId } = render(<ToggleMessage />);

  const toggle = queryByTestId("toggle");
  fireEvent.click(toggle);

  const text = queryByTestId("text");
  expect(text).toBeInTheDocument();
});

test("After clicking toggle message twice, 'Call +11 22 33 44 now!' should not be visible", () => {
  const { queryByTestId } = render(<ToggleMessage />);

  const toggle = queryByTestId("toggle");
  fireEvent.click(toggle);
  fireEvent.click(toggle);

  const text = queryByTestId("text");
  expect(text).not.toBeInTheDocument();

});
