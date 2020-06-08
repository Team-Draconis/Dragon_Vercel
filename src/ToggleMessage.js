/*
The Message component contains an anchor element and a paragraph below the anchor.
Rendering of the paragraph should be toggled by clicking on the anchor element using the following logic:
At the start, the paragraph should not be rendered.
After clicking on the anchor element, the paragraph should be rendered.
After another clicking on the anchor element, the paragraph should not be rendered.
Finish the Message component by implementing this logic.

--------------------------------------------------------
class Message extends React.Component {
  render() {
    return (<React.Fragment>
          <a data-testid="toggle" href="#">Want to buy a new car?</a>
          <p data-testid="text">Call +11 22 33 44 now!</p>
        </React.Fragment>);
  }
}
document.body.innerHTML = "<div id='root'> </div>";
  
const rootElement = document.getElementById("root");
ReactDOM.render(<Message />, rootElement);
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
          data-testid="toggle"
          onClick={(e) => {
            e.preventDefault();
            this.setState({ showNumber: !this.state.showNumber });
          }}
        >
          Want to buy a new car?
        </a>
        {this.state.showNumber && (
          <p data-testid="text">Call +11 22 33 44 now!</p>
        )}
      </div>
    );
  }
}
// import React, { useState } from "react";

// function ToggleMessage() {
//   const [display, setDisplay] = useState("none");
//   const toggle = () => {
//     display === "none" ? setDisplay("block") : setDisplay("none");
//   };

//   return (
//<div>
//  <a href="#" data-testid="toggle" onClick={toggle}>
//    Want to buy a new car?
//  </a>
//  <p data-testid="text" style={{ display }}>
//    Call +11 22 33 44 now!
//  </p>
//</div>;
//   );
// }

export default ToggleMessage;
