/*
Loop Over and Display Data

Get 10 pokemon name and display it on the page.
You can get 10 Pokemon data by using PokeAPI (https://pokeapi.co/api/v2/pokemon/?limit=10").

Response of PokeAPI will be the following format:
  Response =
    { results:
      [
        0; { name: "bulbasaur" },
        1: { name: "ivysaur" },
        2: { name: "venusaur" }
        ...
      ]
    }

Name should be displayed as follows on the page:

bulbasaur
ivysaur
venusaur
charmander
charmeleon
...

*/

import React from "react";

class LoopOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemon: "" };
  }

  UNSAFE_componentWillMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
      .then((res) => res.json())
      .then((json) => {
        const pokeList = json.results.map((pokemon) => (
          <p key={pokemon.name} className="poke-name">
            {pokemon.name}
          </p>
        ));
        this.setState({ pokemon: pokeList });
      });
  }

  render() {
    return (
      <div>
        <div>{this.state.pokemon}</div>
      </div>
    );
  }
}

export default LoopOver;
