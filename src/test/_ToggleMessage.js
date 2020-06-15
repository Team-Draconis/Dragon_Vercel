import { fireEvent } from "@testing-library/react";
import test from "./test";
import errorHandling from "./errorHandling";

export default async function _ToggleMessage() {
  // Test if class='toggle' is on the page
  try {
    const toggle = await document
      .getElementById("test-target")
      .getElementsByClassName("toggle")[0];

    if (toggle) {
      test(
        toggle,
        "isDefined",
        "defined",
        "Toggle message should have class name 'toggle'"
      );

      test(
        toggle.innerHTML,
        "text",
        "Want to buy a new car?",
        "Toggle message 'Want to buy a new car?' should be displayed on the page"
      );

      let text = await document
        .getElementById("test-target")
        .getElementsByClassName("phone-number")[0];

      test(
        text,
        "isNotDefined",
        "notDefined",
        "At the start, 'Call +11 22 33 44 now!' should not be visible"
      );

      fireEvent.click(toggle);

      text = await document
        .getElementById("test-target")
        .getElementsByClassName("phone-number")[0];

      test(text, "isDefined", "defined", "Text should have class name 'text'");

      test(
        text.innerHTML,
        "text",
        "Call +11 22 33 44 now!",
        "After clicking toggle message, 'Call +11 22 33 44 now!' should be visible"
      );

      fireEvent.click(toggle);

      text = await document
        .getElementById("test-target")
        .getElementsByClassName("phone-number")[0];

      test(
        text,
        "isNotDefined",
        "notDefined",
        "After clicking toggle message twice, 'Call +11 22 33 44 now!' should not be visible"
      );
    } else {
      errorHandling("Toggle message should have class name 'toggle'");

      errorHandling(
        "Toggle message 'Want to buy a new car?' should be displayed on the page"
      );
    }
  } catch (error) {
    errorHandling("Error - Please check your code");
  }
}
