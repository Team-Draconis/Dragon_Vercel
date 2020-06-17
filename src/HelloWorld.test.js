const tmpdir = require("os").tmpdir();
let Codes = require(`${tmpdir}/tester.js`);
Codes = Codes.default();

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import Codes from '../tester.js'
test("Render Codes component and check if it has text:'Hello World!'", () => {
  const { getByText } = render(<Codes />);
  const linkElement = getByText(/Hello World!/i);
  expect(linkElement).toBeInTheDocument();
});
