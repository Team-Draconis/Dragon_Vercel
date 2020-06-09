import "./styles.module.scss";
import React, { useEffect, useState, useRef } from "react";
import { createEditor } from "../../utils/editor";
import Link from "next/link";
import Router from "next/router";
import NavBar from "../src/NavBar";

// default code
const code = `function Codes() {
// there should be a paragraph with text "Hello World!"
  return (<div><p>Hello World!</p><button>Click</button></div>)
}
<Codes />
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
        testResult: "Here comes test result",
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

  const runTest = async (req, res) => {
    await fetch("/api/testRunner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testResult: codeInput,
      }),
    }).then((res) =>
      res.json().then((res) => {
        setTestResult(res.data);
      })
    );
  };

  return (
    <>
      <NavBar />
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
        {/* <Link href="/appl/report">Review Results</Link> */}
        {/* <Link href="/">
          <button>Go Back To Home</button>
        </Link> */}
        <button onClick={runTest}>Test</button>
        <div>{testResult}</div>
      </div>
    </>
  );
}
