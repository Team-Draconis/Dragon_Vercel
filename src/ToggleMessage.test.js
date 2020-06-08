import React from "react";
import { render } from "@testing-library/react";
<<<<<<< HEAD
// import ToggleMessage from "./ToggleMessage";
=======
import ToggleMessage from "./ToggleMessage";
>>>>>>> 909bbd403faa2ee68f1934e759c9f157d5959411
import "@testing-library/jest-dom/extend-expect";

test("Render ToggleMessage component and check if it has text:'Want to buy a new car?'", () => {
  const { getByText } = render(<ToggleMessage />);

  const linkElement = getByText(/Want to buy a new car?/i);
  expect(linkElement).toBeInTheDocument();
});
