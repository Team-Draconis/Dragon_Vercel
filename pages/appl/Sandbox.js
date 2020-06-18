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
import _LoopOver from "../../src/test/_LoopOver";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";

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
  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("");
  const [userstory, setUserstory] = useState("");

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const criteria = requirements(mode)
      .requirement.split("\n")
      .map((str, index) => <p key={index}>{str}</p>);

    const flow = requirements(mode)
      .userstory.split("\n")
      .map((str, index) => <p key={index}>{str}</p>);

    setTitle(requirements(mode).title);
    setRequirement(criteria);
    setUserstory(flow);
  }, []);

  let editor = null;
  const el = useRef(null);
  const testTarget = useRef(null);
  const result = useRef(null);
  const codeEditor = useRef(null);

  const runCode = () => {
    run(el.current);
    testOnBrowser();
  };

  const run = (element) => {
    editor = createEditor(element);
    editor.run(code);
  };

  const testOnBrowser = async () => {
    result.current.innerHTML = "";
    await run(testTarget.current);
    if (mode === "easy") {
      await _ToggleMessage();
      isAllPassed();
    }
    if (mode === "medium") {
      await _AddingCalculator();
      isAllPassed();
    }
    if (mode === "hard") {
      await _LoopOver();
      setTimeout(() => {
        isAllPassed();
      }, 150);
    }
  };

  const isAllPassed = () => {
    const container = document.createElement("div");

    if (result.current.innerHTML.includes("Fail")) {
      container.innerHTML = `Some requirements are missing. Try again!`;
    } else {
      container.innerHTML = `Yay! You passed all test!!`;
    }
    document.getElementById("test-result").appendChild(container);
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

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ y: 26 * 1.2, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
      >
        <Box m={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={goBackToDashboard}
          >
            Back to dashboard
          </Button>
        </Box>
        <Box ml={55}>
          <div>
            <p style={titleStyle}>{title}</p>
            <p style={subtitleStyle}>Requirements</p>
            <div>{requirement}</div>
            <p style={subtitleStyle}>User story</p>
            <div>{userstory}</div>
          </div>
        </Box>
      </motion.div>
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
        <div
          ref={testTarget}
          id="test-target"
          style={{ display: "none" }}
        ></div>
        <div id="test-result" ref={result}></div>
        <Box display="flex" mt={2} mb={3}>
          <Box m={1} ml={1}>
            <Button variant="contained" color="primary" onClick={runCode}>
              Run
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="contained" color="primary" onClick={clear}>
              Restart
            </Button>
          </Box>
          <Box m={1}></Box>
          <Box mt={1} ml={3}></Box>
          <Box marginLeft="auto" mt={1} mr={1}>
            <LegalPop
              canID={candidateID}
              canCode={code}
              canMode={mode}
              canCounter={`${Math.floor((600 - counter) / 60)}mins ${
                (600 - counter) % 60
              }secs`}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
