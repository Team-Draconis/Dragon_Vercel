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
import _LoopOver from "../../src/test/_LoopOver";
import { useRouter } from "next/router";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ThreeDotsWave from "../src/ThreeDotsWave";
import Grid from "@material-ui/core/Grid";

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

    const submitted_at_formatted = submitted_at.slice(0, 10);

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
      if (view === "hard") {
        _LoopOver();
      }
    };

    useEffect(() => {
      runCode();
      run();
      testOnBrowser();
    }, []);

    return (
      <>
        <p>
          This test is the most recent result, submitted at:{" "}
          {submitted_at.slice(0, 10)}
        </p>
        <p>Candidate spent: {duration}</p>
        <div className="app">
          {/* <div className="split-view"> */}
          <Grid container align="center">
            <Grid className="code-editor" item xs={12} sm={6} md={6}>
              <textarea value={code} ref={codeEditor} />
            </Grid>
            <Grid
              className="preview"
              ref={el}
              item
              xs={12}
              sm={6}
              md={6}
            ></Grid>
          </Grid>
          {/* <div className="code-editor">
              <textarea value={code} ref={codeEditor} />
            </div>
            <div className="preview" ref={el} /> */}
          {/* </div> */}
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
        <Box ml={3}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            onClick={() => goBackToDashboard()}
          >
            Go back to dashboard
          </Button>
        </Box>

        <Box mt={5}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Desired Location</TableCell>
                <TableCell>Quiz Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{candidateInfo.candidate_name}</TableCell>
                <TableCell>{candidateInfo.candidate_email}</TableCell>
                <TableCell>
                  {candidateInfo.candidate_city
                    ? candidateInfo.candidate_city.join(", ")
                    : ""}
                </TableCell>
                <TableCell>
                  {candidateInfo.quiz_tests.length !== 0
                    ? candidateInfo.quiz_tests[
                        candidateInfo.quiz_tests.length - 1
                      ].quiz_score + "%"
                    : "NA"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* button */}
        <Box position="flex" flexDirection="row" m={3}>
          {candidateInfo.coding_tests.easy.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              align="center"
              onClick={() => {
                setView("easy");
              }}
              m={3}
            >
              Easy Mode Result
            </Button>
          ) : null}

          {candidateInfo.coding_tests.medium.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              align="center"
              onClick={() => {
                setView("medium");
              }}
              style={{ margin: "10px" }}
            >
              Medium Mode Result
            </Button>
          ) : null}

          {candidateInfo.coding_tests.hard.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              align="center"
              onClick={() => {
                setView("hard");
              }}
              style={{ margin: "10" }}
            >
              Hard Mode Result
            </Button>
          ) : null}
        </Box>

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
    return (
      <Box
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Box>{errorMessage ? "Opps" : <ThreeDotsWave />}</Box>
      </Box>
    );
  }
}
