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
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
      <Box m={3}>
        <Button variant="contained" color="primary" onClick={goBackToDashboard}>
          Back to dashboard
        </Button>
      </Box>
      <Box align="center">
        <Typography variant="body1">{requirement}</Typography>
      </Box>
      <Box ml={3}>
        <Typography variant="h6">Remaining Time: {counter}</Typography>
      </Box>
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
        <Box display="flex" mt={2} mb={3}>
          <Box m={1} ml={1}>
            <Button variant="contained" color="primary" onClick={runCode}>
              Run
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="contained" color="primary" onClick={clear}>
              {/* start from scratch */}
              Restart
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="contained" color="primary" onClick={testOnBrowser}>
              {/* Run test on the browser
               */}
              Run Test
            </Button>
          </Box>
          <Box mt={1} ml={3}>
            <div
              ref={testTarget}
              id="test-target"
              style={{ display: "none" }}
            ></div>
            <div id="test-result" ref={result}></div>
          </Box>
          <Box marginLeft="auto" mt={1} mr={1}>
            <LegalPop canID={candidateID} canCode={code} canMode={mode} />
          </Box>
        </Box>
        {/* <button onClick={handleSubmit}>Submit</button>
        <button onClick={clear}>start from scratch</button>
        <button onClick={testOnBrowser}>Run test on the browser</button> */}
      </div>
    </>
  );
}
