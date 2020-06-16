export default function defaultCode(mode) {
  const obj = {
    easy: `class ToggleMessage extends React.Component {
        render() {
          return (
            <div>
                <p>Want to buy a new car?</p>
                <p>Call +11 22 33 44 now!</p>
            </div>
          );
        }
      }
<ToggleMessage />
          `,
    medium: `class AddingCalculator extends React.Component {
  render() {
    return (
      <div>    
        <input></input>
        <input></input>
        <button>add</button>
        <p>result</p>
      </div>
    );
  }
}
<AddingCalculator />`,
    hard: `class LoopOver extends React.Component {
      render() {
        return (
          <div>
            <p>Pokemon1</p>
            <p>Pokemon2</p>
          </div>
        );
      }
    }
  <LoopOver />`,
  };
  return obj[mode];
}
