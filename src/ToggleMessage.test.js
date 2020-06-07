import React from "react";
import { render } from "@testing-library/react";
import ToggleMessage from "./ToggleMessage";
import "@testing-library/jest-dom/extend-expect";

test("Render ToggleMessage component and check if it has text:'Want to buy a new car?'", () => {
  const { getByText } = render(<ToggleMessage />);

  const linkElement = getByText(/Want to buy a new car?/i);
  expect(linkElement).toBeInTheDocument();
});
