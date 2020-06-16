/*
Toggle Message

Toggle Message 'Want to buy a new car?' should be display on the page.
Text 'Call +11 22 33 44 now!' should appear/hide everytime user click toggle message.

Toggle message should be set data-testid="toggle", text should be set data-testid="text".
e.g <p data-testid="toggle">sample</p>

Flow
1. Toggle message 'Want to buy a new car?' is displayed on the page when user open.
2. Text 'Call +11 22 33 44 now!' is not visible at first.
3. User click toggle message.
4. Text 'Call +11 22 33 44 now!' will appear below toggle message.
5. Text 'Call +11 22 33 44 now!' will disappear when user click toggle message again.


Want to buy a new car?

 | Click toggle message
 V

Want to buy a new car?
Call +11 22 33 44 now!
*/

import React from "react";
class ToggleMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNumber: false };
  }

  render() {
    return (
      <div>
        <a
          href="#"
          className="toggle"
          onClick={(e) => {
            e.preventDefault();
            this.setState({ showNumber: !this.state.showNumber });
          }}
        >
          Want to buy a new car?
        </a>
        {this.state.showNumber && (
          <p className="phone-number">Call +11 22 33 44 now!</p>
        )}
      </div>
    );
  }
}

export default ToggleMessage;
