import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Codes from "../codes_file";

test("Render Codes component and check if it has text:'Hello World!'", () => {
  const { getByText } = render(<Codes />);
  const linkElement = getByText(/Hello World!/i);
  expect(linkElement).toBeInTheDocument();
});
