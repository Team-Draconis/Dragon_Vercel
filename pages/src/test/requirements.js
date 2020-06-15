export default function requirements(mode) {
  const obj = {
    easy: `***Toggle Message***

    Requirements:
    - Toggle Message 'Want to buy a new car?' should be display on the page.
    - Text 'Call +11 22 33 44 now!' should appear/hide everytime user click toggle message.
    - Toggle message should be set class name: "toggle", text should be set class name: "text".
    
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
        | Click toggle message
        V
    ┏━━━━━━━━━━━━━━━━━━━━━━━┓ 
    Want to buy a new car?
    Call +11 22 33 44 now!
    ┗━━━━━━━━━━━━━━━━━━━━━━━┛
`,
    medium: `Midium Mode: there should be a paragraph with text "Hello World!"`,
    hard: `Hard Mode: there should be a paragraph with text "Hello World!"`,
  };
  return obj[mode];
}
