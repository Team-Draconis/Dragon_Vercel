/*
Adding Calculator

The page should have two input area.
They should be set data-testid="number1" and data-testid="number2".
e.g <p data-testid="number1">sample</p>

Add button should be on the page.
It should be set data-testid="add".

Result should be displayed when user click "Add" button.
It should be set data-testid="result".

Flow
1. User input number to two text fields.  // 1, 5
2. User click "add" button.
3. Adding result should be displayed below the button. // 6

┏━━━━━━━━━━━┓   ┏━━━━━━━━━━━┓
┃input field┃   ┃input field┃
┗━━━━━━━━━━━┛   ┗━━━━━━━━━━━┛
┏━━━━━━━━━━━┓
┃add button ┃
┗━━━━━━━━━━━┛
┏━━━━━━━━━━━┓
┃   result  ┃
┗━━━━━━━━━━━┛

*/

import React from "react";
class AddingCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number1: 0, number2: 0, total: 0 };

    this.adding = this.adding.bind(this);
  }

  // can use arrow function for adding instead of this.adding = this.adding.bind(this)
  adding() {
    this.setState({
      total: Number(this.state.number1) + Number(this.state.number2),
    });
  }

  render() {
    return (
      <div>
        Calculator
        <div>
          <input
            type="text"
            className="number1"
            onChange={(e) => {
              this.setState({ number1: e.target.value });
            }}
          ></input>
          <input
            type="text"
            className="number2"
            onChange={(e) => {
              this.setState({ number2: e.target.value });
            }}
          ></input>
        </div>
        <button className="add" onClick={this.adding}>
          add
        </button>
        <p data-testid="result">{this.state.total}</p>
      </div>
    );
  }
}

export default AddingCalculator;
