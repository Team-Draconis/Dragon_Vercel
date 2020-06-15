import "./styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { createEditor } from "../../utils/editor";
import Router from "next/router";
import NavBar from "../src/NavBar";
import styled from "styled-components";
import LegalPop from '../src/LegalPop'

//Styling
const App = styled.div`
  box-sizing: border-box;
  -webkit-fontsmoothing: antialiased;
  font-family: "Monaco", "Consolas", "sans";
`;

const Split_View = styled.div`
  display: flex;
  width: 100%;
  min-width: 600px;
`;

// default code
const defaultCode = `function Codes() {
  return (<div><p>Hello World!</p><button>Click</button></div>)
}
<Codes />
`;

// Needs Mako's help to modify here
const requirements = {
  easy: `Easy Mode: there should be a paragraph with text "Hello World!"`,
  medium: `Medium Mode: there should be a paragraph with text "Hello World!"`,
  hard: `Hard Mode: there should be a paragraph with text "Hello World!"`,
};

export default function SandBox({ mode, goBackToDashboard, candidateID }) {
  const [code, setCode] = useState(defaultCode);
  const [testResult, setTestResult] = useState(null);
  const [counter, setCounter] = useState(600);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  let editor = null;
  const el = useRef(null);
  const runCode = () => {
    editor = createEditor(el.current);
    editor.run(code);
    run(code);
  };

  const run = () => {
    editor.run(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/testRunner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: candidateID,
        codes: code,
        test_mode: mode,
        test_result: "Here comes test result",
      }),
    })
      .then((res) => {
        Router.push("/appl/end");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const runTest = async (req, res) => {
    await fetch("/api/testRunner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codes: code,
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
      <button onClick={goBackToDashboard}>Back to dashboard</button>
      <p>Requirements: {requirements[mode]}</p>
      <p>Countdown: {counter}</p>
      <div className="app">
        <div className="split-view">
          <div className="code-editor">
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="preview" ref={el} />
        </div>
        <button onClick={runCode}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={runTest}>Test</button>
        <LegalPop canID = {candidateID} canCode = {code} canMode = {mode} />
        <div>{testResult}</div>
      </div>
    </>
  );
}
