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
    medium: `
function Codes() {
    return (<div><p>Hello World!</p><button>Click</button></div>)
}
<Codes />
          `,
    hard: `
function Codes() {
    return (<div><p>Hello World!</p><button>Click</button></div>)
}
<Codes />
      `,
  };
  return obj[mode];
}
