import React from "react";
import { render, waitFor } from "@testing-library/react";
import LoopOver from "./LoopOver";
import "@testing-library/jest-dom/extend-expect";

//To run this test, run "yarn test:fetch"

const pokeList = [
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

test("All data in the array should be displayed on the page", async () => {
  const { getByText } = render(<LoopOver />);

  for (let i = 0; i < pokeList.length; i++) {
    await waitFor(() => expect(getByText(pokeList[i])).toBeInTheDocument());
  }
});
