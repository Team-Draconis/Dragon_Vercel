import { fireEvent } from "@testing-library/react";
import test from "./test";
import errorHandling from "./errorHandling";

export default async function _AddingCalcularor() {
  try {
    const number1 = await document
      .getElementById("test-target")
      .getElementsByClassName("number1")[0];

    const number2 = await document
      .getElementById("test-target")
      .getElementsByClassName("number2")[0];

    const add = await document
      .getElementById("test-target")
      .getElementsByClassName("add")[0];

    test(
      number1,
      "isDefined",
      "defined",
      "Input field1 should have class name 'number1'."
    );

    test(
      number2,
      "isDefined",
      "defined",
      "Input field2 should have class name 'number2'."
    );

    test(
      add,
      "isDefined",
      "defined",
      "Add button should have class name 'add'."
    );

    fireEvent.change(number1, { target: { value: 1 } });
    fireEvent.change(number2, { target: { value: 5 } });
    fireEvent.click(add);

    const result = await document
      .getElementById("test-target")
      .getElementsByClassName("adding-result")[0];

    test(
      result.innerHTML,
      "text",
      "6",
      "'6' should be displayed on the page when input 1 and 5, and click add button."
    );
  } catch (error) {
    errorHandling();
  }
}
