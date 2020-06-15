import { fireEvent } from "@testing-library/react";
import test from "./test";
import errorHandling from "./errorHandling";

export default async function _AddingCalcularor() {
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
    "Input field1 should have class name 'number1'"
  );

  test(
    number2,
    "isDefined",
    "defined",
    "Input field2 should have class name 'number2'"
  );

  test(add, "isDefined", "defined", "Add button should have class name 'add'");

  //when user input 1 and 5 and click button, result should be 6
}
