import React from "react";
import { render, fireEvent, getNodeText } from "@testing-library/react";
import AddingCalculator from "./AddingCalculator";
import "@testing-library/jest-dom/extend-expect";

test("Input fields should be set data-testid='number1' and data-testid='number1'", () => {
  const { queryByTestId } = render(<AddingCalculator />);

  const number1 = queryByTestId("number1");
  expect(number1).toBeInTheDocument();

  const number2 = queryByTestId("number2");
  expect(number2).toBeInTheDocument();
});

test("Add button should be set data-testid='add'", () => {
  const { queryByTestId } = render(<AddingCalculator />);

  const addButton = queryByTestId("add");
  expect(addButton).toBeInTheDocument();
});

test("'6' should be displayed on the page when input 1 and 5, and click add button", () => {
  const { queryByTestId } = render(<AddingCalculator />);

  const number1 = queryByTestId("number1");
  const number2 = queryByTestId("number2");
  const addButton = queryByTestId("add");

  //Input values to number1 and number2
  fireEvent.change(number1, { target: { value: 1 } });
  fireEvent.change(number2, { target: { value: 5 } });

  //Click add button
  fireEvent.click(addButton);

  //Check result
  const result = getNodeText(queryByTestId("result"));
  expect(result).toEqual("6");
});
