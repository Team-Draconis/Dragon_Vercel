export default function defaultCode(mode) {
  const obj = {
    easy: `class ToggleMessage extends React.Component {
      render() {
        return (
          <p>YOUR CODE HERE</p>
        );
      }
    }
<ToggleMessage />`,
    medium: `class AddingCalculator extends React.Component {
      render() {
        return (
          <p>YOUR CODE HERE</p>
        );
      }
    }
    <AddingCalculator />`,
    hard: `class LoopOver extends React.Component {
      render() {
        return (  
          <p>YOUR CODE HERE</p>
        );
      }
    }
  <LoopOver />`,
  };
  return obj[mode];
}
