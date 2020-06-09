import React from "react";
<<<<<<< HEAD

import { render, fireEvent } from "@testing-library/react";
import ToggleMessage from "./ToggleMessage";
=======
import { render } from "@testing-library/react";
>>>>>>> fb85f50787e925dee66dd72334d18f82dd9d319b
import "@testing-library/jest-dom/extend-expect";
import Codes from "../tester";

test("Render Codes component and check if it has text:'Hello World!'", () => {
  const { getByText } = render(<Codes />);
  const linkElement = getByText(/Hello World!/i);
  expect(linkElement).toBeInTheDocument();
});
