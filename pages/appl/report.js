//  NEW NEW NEW
// --- Zowie's Code ---
// Component for Candidate to view their own test results.
import "./styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../src/NavBar";
import { createEditor } from "../../utils/editor";
import styled from "styled-components";
import _ToggleMessage from "../../src/test/_ToggleMessage";
import _AddingCalculator from "../../src/test/_AddingCalculator";
import { useRouter } from "next/router";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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

function CodeDisplaySandbox({ candidateInfo, view }) {
  if (candidateInfo) {
    const code =
      candidateInfo.coding_tests[view][
        candidateInfo.coding_tests[view].length - 1
      ].coding_test_codes;

    const submitted_at =
      candidateInfo.coding_tests[view][
        candidateInfo.coding_tests[view].length - 1
      ].coding_test_submitted_at;

    const duration =
      candidateInfo.coding_tests[view][
        candidateInfo.coding_tests[view].length - 1
      ].coding_test_duration;

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
      if (view === "easy") {
        _ToggleMessage();
      }
      if (view === "medium") {
        _AddingCalculator();
      }
    };

    useEffect(() => {
      runCode();
      run();
      testOnBrowser();
    }, []);

    return (
      <>
        <p>This test was the latest, submitted at : {submitted_at}</p>
        <p>Candidate spent : {duration}</p>
        <div className="app">
          <div className="split-view">
            <div className="code-editor">
              <textarea value={code} ref={codeEditor} />
            </div>
            <div className="preview" ref={el} />
          </div>
          <div
            ref={testTarget}
            id="test-target"
            style={{ display: "none" }}
          ></div>
          <p>Test Results:</p>
          <div id="test-result" ref={result}></div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default function ReportToCandidate({
  candidateInfo,
  goBackToDashboard,
}) {
  const router = useRouter();
  const [view, setView] = useState("initial");
  const [errorMessage, setErrorMessage] = useState("");

  if (candidateInfo) {
    return (
      <>
        <NavBar />
        <Box ml={2}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            onClick={() => goBackToDashboard()}
          >
            Go back to dashboard
          </Button>
        </Box>
        <p>Candidate Name : {candidateInfo.candidate_name}</p>
        <p>Desired Location : {candidateInfo.candidate_city}</p>
        <p>Email : {candidateInfo.candidate_email}</p>

        <p>
          Quiz Score:{" "}
          {candidateInfo.quiz_tests.length !== 0
            ? candidateInfo.quiz_tests[candidateInfo.quiz_tests.length - 1]
                .quiz_score + "%"
            : "NA"}
        </p>
        {candidateInfo.coding_tests.easy.length > 0 ? (
          <button
            onClick={() => {
              setView("easy");
            }}
          >
            Easy Mode Result
          </button>
        ) : null}

        {candidateInfo.coding_tests.medium.length > 0 ? (
          <button
            onClick={() => {
              setView("medium");
            }}
          >
            Medium Mode Result
          </button>
        ) : null}

        {candidateInfo.coding_tests.hard.length > 0 ? (
          <button
            onClick={() => {
              setView("hard");
            }}
          >
            Hard Mode Result
          </button>
        ) : null}

        {view === "easy" ? (
          <CodeDisplaySandbox view={view} candidateInfo={candidateInfo} />
        ) : null}
        {view === "medium" ? (
          <CodeDisplaySandbox view={view} candidateInfo={candidateInfo} />
        ) : null}
        {view === "hard" ? (
          <CodeDisplaySandbox view={view} candidateInfo={candidateInfo} />
        ) : null}
      </>
    );
  } else {
    return <p>{errorMessage ? "Opps" : "It is loading"}</p>;
  }
}
