//Zowie's comments:
//company is not able to modify the candidate's codes
//it automatically displays the candidate's codes view (sandbox right side) and the test result below
//if candidate has not taken hard mode test yet, then no 'Hard Mode Result'button
//only shows each most latest code from easy, medium, hard (we can display more if we want later)

import "../../appl/styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../src/NavBar";
import { createEditor } from "../../../utils/editor";
import styled from "styled-components";
import _ToggleMessage from "../../../src/test/_ToggleMessage";
import _AddingCalculator from "../../../src/test/_AddingCalculator";

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
  }
}

export default function Report({ candidateInfo }) {
  const [view, setView] = useState("initial");
  if (candidateInfo) {
    return (
      <>
        <NavBar />
        <p>Candidate Name : {candidateInfo.candidate_name}</p>
        <p>Desired Location : {candidateInfo.candidate_city}</p>
        <p>Email : {candidateInfo.candidate_email}</p>
        {/* <p>Quiz correct rates: {candidateInfo.quiz_tests.quiz_score}</p> */}
        <p>Quiz correct rates: 60% </p>
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
  }
}

Report.getInitialProps = async ({ query: { id } }) => {
  try {
    const res = await fetch(
      `http://dragontester-env-1.eba-cqpqhfiq.us-east-2.elasticbeanstalk.com/api/${id}`
    );
    const { data } = await res.json();
    return { candidateInfo: data };
  } catch (error) {
    return {
      candidateInfo: {
        _id: "dummy",
        candidate_name: "dummy",
        andidate_email: "dummy",
        candidate_city: "dummy",
        coding_tests: "dummy",
      },
    };
  }
};
