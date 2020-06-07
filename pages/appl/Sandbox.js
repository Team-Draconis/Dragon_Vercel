import "./styles.module.scss";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { createEditor } from "../../utils/editor";
import debounce from "debounce";
import Link from "next/link";
import Router from "next/router";
import TestResult from "../test/[id]";

// default code
const code = `import x from 'x';
// edit this example
function Greet() {
  return <span>Hello World!</span>
}
<Greet />
`;
export default function SandBox() {
  const [codeInput, setCodeInput] = useState(code);
  const [email, setEmail] = useState("email");
  const [city, setCity] = useState("city");
  const [testResult, setTestResult] = useState(null);

  let editor = null;
  const el = useRef(null);
  const runCode = () => {
    editor = createEditor(el.current);
    editor.run(codeInput);
    run(codeInput);
  };
  const onCodeChange = ({ target: { value } }) => {
    setCodeInput(value);
  };

  const onEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const onCityChange = ({ target: { value } }) => {
    setCity(value);
  };

  const run = () => {
    editor.run(codeInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    fetch("/api/codetest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        codes: codeInput,
        city: city,
      }),
    })
      .then((res) => {
        // Do a fast client-side transition to the already prefetched dashboard page
        if (res.ok) Router.push("/appl/end");
      })
      .catch((error) => {
        console.log(error); // add more detail error later
      });
  };

  const Test = () => {
    const expect = `import x from 'x';\n// edit this example\nfunction Greet() {\n  return <span>Hello World!</span>\n}\n<Greet />`;
    if (codeInput.includes(expect)) {
      return testResult;
    }
    console.log(codeInput);
    console.log(expect);
    return testResult;
  };

  const result = "test result";

  let output;
  const runTest = async (res, req) => {
    console.log("in runTest");
    output = await fetch("/api/testRunner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then((res) =>
      res.json().then((res) => {
        setTestResult(res.data);
        console.log("#####", res.data);
      })
    );
  };

  //   fetch("/api/testRunner", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //
  //     }),
  //   })
  //     .then((res) => {
  //       // Do a fast client-side transition to the already prefetched dashboard page
  //       if (res.ok) Router.push("/appl/end");
  //     })
  //     .catch((error) => {
  //       console.log(error); // add more detail error later
  //     });
  // };

  return (
    <div className="app">
      <input type="text" onChange={onEmailChange} value={email} />
      <input type="text" onChange={onCityChange} value={city} />

      <div className="split-view">
        <div className="code-editor">
          <textarea
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
        </div>
        <div className="preview" ref={el} />
      </div>
      <button onClick={runCode}>Run</button>

      <button onClick={handleSubmit}>Submit</button>
      <Link href="/">
        <button>Go Back To Home</button>
      </Link>
      <button onClick={runTest}>Test</button>
      <div>{testResult}</div>
    </div>
  );
}
