export default function requirements(mode) {
  const obj = {
    easy: `*** Toggle Message ***

    Requirements:
    - Toggle Message 'Want to buy a new car?' should be displayed on the page.
    - Text 'Call +11 22 33 44 now!' should appear/hide everytime user click toggle message.
    - Toggle message should be set class name: "toggle", text should be set class name: "phone-number".
    
    User story:
    1. Toggle message 'Want to buy a new car?' is displayed on the page.
    2. Text 'Call +11 22 33 44 now!' is not visible at first.
    3. User click toggle message.
    4. Text 'Call +11 22 33 44 now!' will appear below toggle message.
    5. Text 'Call +11 22 33 44 now!' will disappear when user click toggle message again.

    As is:
    'Want to buy a new car?' and 'Call +11 22 33 44 now!' are always displayed.
    
    To be:
    ┏━━━━━━━━━━━━━━━━━━━━━━━┓ 
    Want to buy a new car?
    ┗━━━━━━━━━━━━━━━━━━━━━━━┛
    Click toggle message
        | 
        V
    ┏━━━━━━━━━━━━━━━━━━━━━━━┓ 
    Want to buy a new car?
    Call +11 22 33 44 now!
    ┗━━━━━━━━━━━━━━━━━━━━━━━┛
`,
    medium: `*** Adding Calculator ***

    Requirements:
    - Two input area should be on the page.
    - Input area should have the following class name: first one; "number1" and second one: "number2"
    - Add button should be on the page. It should have class name: "add".
    - Result of addition should be displayed on the page. It should have class name: "adding-result"

    User story:
    1. User input number to two text fields.  // e.g. 1 and 5
    2. User click "add" button.
    3. Adding result should be displayed below the button. // e.g. 6
`,
    hard: `*** Loop Over and Display Data ***

    Requirements:
    - Get 10 pokemon name and display it on the page.
    - Each Pokemon name should be inside separated element.
    - Each Pokemon name element should have key prop and set name inside it.
    - Each Pokemon name element should have class name: "poke-name". 

    - You can get 10 Pokemon data by using PokeAPI (https://pokeapi.co/api/v2/pokemon/?limit=10").
    
    - Response of PokeAPI will be the following format:
      Response = { results:[
            0; { name: "bulbasaur" },
            1: { name: "ivysaur" },
            2: { name: "venusaur" }...]}
    
    Name of Pokemon should be displayed as follows on the page:
    
    bulbasaur
    ivysaur
    venusaur
    ...`,
  };
  return obj[mode];
}
