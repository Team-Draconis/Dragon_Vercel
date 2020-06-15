//Zowie's memo:
//When candidate clicks 'agree' in legal page, only duration, codes will be saved to db. Test result is unnecessary since if we have codes we can get the result by running it in browser anyway.

import "./styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { createEditor } from "../../utils/editor";
import Router from "next/router";
import NavBar from "../src/NavBar";
import styled from "styled-components";
import LegalPop from "../src/LegalPop";
import requirements from "../../src/test/requirements";
import defaultCode from "../../src/test/defaultCode";
import _ToggleMessage from "../../src/test/_ToggleMessage";
import _AddingCalculator from "../../src/test/_AddingCalculator";

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

export default function SandBox({ mode, goBackToDashboard, candidateID }) {
  const [code, setCode] = useState(defaultCode(mode));
  const [counter, setCounter] = useState(600);
  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setRequirement(
      requirements(mode)
        .split("\n")
        .map((str, index) => <p key={index}>{str}</p>)
    );
  }, []);

  let editor = null;
  const el = useRef(null);
  const testTarget = useRef(null);
  const result = useRef(null);
  const codeEditor = useRef(null);

  const runCode = () => {
    run(el.current);
    result.current.innerHTML = "";
  };

  const run = (element) => {
    editor = createEditor(element);
    editor.run(code);
  };

  const testOnBrowser = async () => {
    result.current.innerHTML = "";
    await run(testTarget.current);
    if (mode === "easy") {
      _ToggleMessage();
    }
    if (mode === "medium") {
      _AddingCalculator();
    }
  };

  const clear = () => {
    // crear code editor
    codeEditor.current.value = "";
    codeEditor.current.value = defaultCode(mode);
    setCode(defaultCode(mode));

    // clear test result
    result.current.innerHTML = "";

    // crear preview
  };

  return (
    <>
      <NavBar />
      <button onClick={goBackToDashboard}>Back to dashboard</button>
      <div>{requirement}</div>
      <p>Countdown: {counter}</p>
      <div className="app">
        <div className="split-view">
          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              ref={codeEditor}
            />
          </div>
          <div className="preview" ref={el} />
        </div>
        <button onClick={runCode}>Run</button>
        <button onClick={clear}>start from scratch</button>
        <button onClick={testOnBrowser}>Run test on the browser</button>
        <div
          ref={testTarget}
          id="test-target"
          style={{ display: "none" }}
        ></div>
        <div id="test-result" ref={result}></div>
        <LegalPop
          canID={candidateID}
          canCode={code}
          canMode={mode}
          canCounter={`${Math.floor((600 - counter) / 60)}mins ${
            (600 - counter) % 60
          }secs`}
        />
      </div>
    </>
  );
}
