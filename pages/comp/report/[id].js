//Zowie's comments:
//company is not able to modify the candidate's codes
//it automatically displays the candidate's codes view (sandbox right side) and the test result below
//if candidate has not taken hard mode test yet, then no 'Hard Mode Result'button
//only shows each most latest code from easy, medium, hard (we can display more if we want later)
//display the city with comma in bewtween

import "../../appl/styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../src/NavBar";
import { createEditor } from "../../../utils/editor";
import styled from "styled-components";
import _ToggleMessage from "../../../src/test/_ToggleMessage";
import _AddingCalculator from "../../../src/test/_AddingCalculator";
import { useRouter } from "next/router";
import Router from "next/router";
import _LoopOver from "../../../src/test/_LoopOver";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ThreeDotsWave from "../../src/ThreeDotsWave";
import Grid from "@material-ui/core/Grid";

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
        setTimeout(() => {}, 150);
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
          {submitted_at_formatted}
        </p>
        <p>Candidate spent: {duration}</p>
        <div className="app">
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

export default function Report({ candidateID }) {
  const router = useRouter();
  const [view, setView] = useState("initial");
  const [candidateInfo, setCandidateInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch(`/api/${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        res.json().then((res) => {
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            setCandidateInfo(res.data);
          }
        });
      });
    } else {
      //if there is no token , then force the candidate to sign in
      setErrorMessage("Please login");
    }
  }, []);

  if (candidateInfo) {
    const candidateCities = candidateInfo.candidate_city;
    const candidate_Cities_formatted = candidateCities.join(", ");
    return (
      <>
        <NavBar />
        <Box ml={3}>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            onClick={() => Router.push("/comp/dashboard")}
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
                <TableCell>{candidate_Cities_formatted}</TableCell>
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
        <Grid container align="center">
          <Grid item xs={10} sm={10} md={3}>
            {candidateInfo.coding_tests.easy.length > 0 ? (
              <Button
                variant="contained"
                color="primary"
                align="center"
                onClick={() => {
                  setView("easy");
                }}
                style={{ marginTop: "4px", width: "90%" }}
              >
                Easy Mode Result
              </Button>
            ) : null}
          </Grid>

          <Grid item xs={10} sm={10} md={3}>
            {candidateInfo.coding_tests.medium.length > 0 ? (
              <Button
                variant="contained"
                color="primary"
                align="center"
                onClick={() => {
                  setView("medium");
                }}
                style={{ marginTop: "4px", width: "90%" }}
              >
                Medium Mode Result
              </Button>
            ) : null}
          </Grid>

          <Grid item xs={10} sm={10} md={3}>
            {candidateInfo.coding_tests.hard.length > 0 ? (
              <Button
                variant="contained"
                color="primary"
                align="center"
                onClick={() => {
                  setView("hard");
                }}
                style={{ marginTop: "4px", width: "90%" }}
              >
                Hard Mode Result
              </Button>
            ) : null}
          </Grid>
        </Grid>

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
        <Box>
          {errorMessage ? (
            "Sorry you are not authenticated,please signin first"
          ) : (
            <ThreeDotsWave />
          )}
        </Box>
      </Box>
    );
  }
}

Report.getInitialProps = async ({ query: { id } }) => {
  try {
    return { candidateID: id };
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
