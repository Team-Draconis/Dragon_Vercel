import { fireEvent } from "@testing-library/react";
import test from "./test";
import errorHandling from "./errorHandling";
import { isAssertionExpression } from "typescript";

export default async function _LoopOver() {
  const expected = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
    "caterpie",
  ];

  try {
    const testTarget = await document.getElementById("test-target");
    const pokenameClass = testTarget.getElementsByClassName("poke-name");

    await setTimeout(() => {
      try {
        test(
          pokenameClass.item(0),
          "isDefined",
          "defined",
          "Each Pokemon name element should have class name: 'poke-name'."
        );

        test(
          pokenameClass,
          "length",
          10,
          "Each Pokemon name should be inside separated element."
        );

        //check if displayed Pokemon is correct
        const container = document.createElement("div");
        const description = "Order of 10 Pokemon name should be correct.";

        let result = 0;
        for (let i = 0; i < 10; i++) {
          if (pokenameClass.item(i).innerHTML !== expected[i]) {
            result++;
          }
        }
        if (result === 0) {
          container.innerHTML = `Pass - ${description}`;
        } else {
          container.innerHTML = `Fail - ${description}`;
        }
        document.getElementById("test-result").appendChild(container);
      } catch (error) {
        errorHandling();
      }
    }, 100);
  } catch (error) {
    errorHandling();
  }
}
