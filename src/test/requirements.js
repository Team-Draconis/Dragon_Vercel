export default function requirements(mode) {
  const title = {
    easy: `Buy a new car?`,
    medium: `Adding Calculator`,
    hard: `Correct Pokemon`,
  };

  const requirement = {
    easy: `- The message 'Want to buy a new car?' should be displayed on the page.
    - Text 'Call +11 22 33 44 now!' should appear/disappear everytime the user clicks the message.
    - The message should have the class name "toggle", while the phone number text should have the class name "phone-number".
`,
    medium: `- Two input areas should be on the page.
    - Input areas should have the class names "number1" and "number2", respectively.
    - An "add" button should be on the page. It should have the class name: "add".
    - Result of addition should be displayed on the page. It should have class name: "adding-result".
`,
    hard: `- Get 10 pokemon names and display them on the page.
    - Each Pokemon name should be inside a separate element.
    - Each Pokemon name element should have the class name: "poke-name". 

    - You can get 10 Pokemon data by using PokeAPI (https://pokeapi.co/api/v2/pokemon/?limit=10").
    
    - Response of PokeAPI will be in the following format:
    - { results: [ { name: "bulbasaur" }, { name: "ivysaur" }, { name: "venusaur" }...] }
      `,
  };

  const userstory = {
    easy: `1. Message 'Want to buy a new car?' is displayed on the page.
    2. Text 'Call +11 22 33 44 now!' is not visible at first.
    3. User clicks toggle message.
    4. Text 'Call +11 22 33 44 now!' will appear below the message.
    5. Text 'Call +11 22 33 44 now!' will disappear when user clicks the message again.`,
    medium: `1. User input number to two text fields.  // e.g. 1 and 5
    2. User click "add" button.
    3. Adding result should be displayed below the button. // e.g. 6`,
    hard: `1. User can see 10 Pokemon name.
    2. They should be displayed as follows on the page:
    bulbasaur
    ivysaur
    venusaur
    ...`,
  };

  return {
    title: title[mode],
    requirement: requirement[mode],
    userstory: userstory[mode],
  };
}
