//candidate dashboard when they successfully login in
//zowie- add a button for candidate to view the latest test results that they took.

import NavBar from "../../src/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const LoginPage = dynamic(() => import("../register"));
import SandBox from "../Sandbox";
import QuizApp from "../QuizApp";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Router from "next/router";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReportToCandidate from "../report";

export default function CandidateDashboard({ candidateID }) {
  const router = useRouter();
  let temp;
  let city;
  const [view, setView] = useState("initial");
  const [candidateInfo, setCandidateInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [latesttesttime, setLatesttesttime] = useState();

  //Declaring styled textfield
  const CssTextField = withStyles({
    root: {
      "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
        borderColor: "red", //default
      },
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFC107",
        },
      },
    },
  })(TextField);

  useEffect(() => {
    if (localStorage.getItem("candidatetoken") !== null) {
      fetch(`/api/${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("candidatetoken"),
        },
      }).then((res) => {
        res.json().then((res) => {
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            setCandidateInfo(res.data);
            if (
              res.data.quiz_tests.length === 0 &&
              res.data.coding_tests.easy.length === 0 &&
              res.data.coding_tests.medium.length === 0 &&
              res.data.coding_tests.hard.length === 0
            ) {
              return;
            }
            const all_latest_test_data = [];
            if (res.data.quiz_tests.length !== 0) {
              let latest_quiz_test_data =
                res.data.quiz_tests[res.data.quiz_tests.length - 1]
                  .quiz_submitted_at;
              all_latest_test_data.push(latest_quiz_test_data);
            }
            if (res.data.coding_tests.easy.length !== 0) {
              let latest_easy_test_data =
                res.data.coding_tests.easy[
                  res.data.coding_tests.easy.length - 1
                ].coding_test_submitted_at;
              all_latest_test_data.push(latest_easy_test_data);
            }
            if (res.data.coding_tests.medium.length !== 0) {
              let latest_medium_test_data =
                res.data.coding_tests.medium[
                  res.data.coding_tests.medium.length - 1
                ].coding_test_submitted_at;
              all_latest_test_data.push(latest_medium_test_data);
            }
            if (res.data.coding_tests.hard.length !== 0) {
              let latest_hard_test_data =
                res.data.coding_tests.hard[
                  res.data.coding_tests.hard.length - 1
                ].coding_test_submitted_at;
              all_latest_test_data.push(res.data.coding_tests.hard);
            }
            const result = all_latest_test_data.sort(function (a, b) {
              var c = new Date(a);
              var d = new Date(b);
              return d - c;
            });
            console.log(result);
            console.log(`${result[0]}`);
            setLatesttesttime(`${result[0]}`);
            // console.log(latesttesttime);
          }
        });
      });
    } else {
      //if there is no token , then force the candidate to sign in
      Router.push("/appl/SignIn");
    }
  }, []);

  const handleRefresh = () => {
    if (localStorage.getItem("candidatetoken") !== null) {
      fetch(`/api/${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("candidatetoken"),
        },
      }).then((res) => {
        res.json().then((res) => {
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            console.log("#####AFTER REFERSHED", res.data);
            setCandidateInfo(res.data);
          }
        });
      });
    } else {
      //if there is no token , then force the candidate to sign in
      Router.push("/appl/SignIn");
    }
  };

  const onAddCity = ({ target: { value } }) => {
    city = value;
  };

  const onRemoveCity = ({ target: { value } }) => {
    city = value;
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    fetch("/api/addCity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: candidateInfo.candidate_email,
        candidate_city: city,
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          //Please don't delete this console.log, since I don't know what to do with it , we can not return anything here including res.send()
          console.log("New City has been saved");
        })
      )
      .catch((error) => {
        console.log(error);
      });
    Router.replace(`/appl/dashboard/${candidateInfo._id}`);
  };

  const handleRemoveCity = (e) => {
    e.preventDefault();
    fetch("/api/removeCity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: candidateInfo.candidate_email,
        candidate_city: city,
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          console.log("The city has been removed");
        })
      )
      .catch((error) => {
        console.log(error);
      });
    Router.replace(`/appl/dashboard/${candidateInfo._id}`);
  };

  const goBackToDashboard = () => {
    setView("initial");
  };

  if (candidateInfo) {
    const candidateCities = candidateInfo.candidate_city;
    const candidate_Cities_formatted = candidateCities.join(", ");

    if (view === "initial") {
      return (
        <div>
          <NavBar />

          <Box display="flex" flexDirection="row">
            {/* User status part */}
            <Box mt={6} width="60%">
              <Typography
                variant="h3"
                component="h1"
                align="center"
                style={{ fontFamily: "Josefin Sans" }}
              >
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 0.5 }}
                >
                  {`Hello ${candidateInfo.candidate_name} 🐲  Welcome to your dashboard`}
                </motion.div>
              </Typography>
              <Box mt={3}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.8 }}
                  >
                    {`Your email address is ${candidateInfo.candidate_email}`}
                  </motion.div>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.1 }}
                  >
                    {`You are interested in working in ${candidate_Cities_formatted}`}
                  </motion.div>
                </Typography>
              </Box>
              {candidateInfo.quiz_tests.length === 0 && !latesttesttime ? (
                <Box mt={3}>
                  <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    style={{ fontFamily: "Josefin Sans" }}
                  >
                    <motion.div
                      initial={{ y: 26 * 1.2, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        ease: "easeOut",
                        duration: 1.5,
                        delay: 1.1,
                      }}
                    >
                      Thank you for signup,wanna take some test to shine your
                      skills?!
                    </motion.div>
                  </Typography>
                </Box>
              ) : null}
              {candidateInfo.quiz_tests.length !== 0 ? (
                <Box mt={3}>
                  <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    style={{ fontFamily: "Josefin Sans" }}
                  >
                    <motion.div
                      initial={{ y: 26 * 1.2, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        ease: "easeOut",
                        duration: 1.5,
                        delay: 1.1,
                      }}
                    >
                      {`Your recent quiz score is ${
                        candidateInfo.quiz_tests[
                          candidateInfo.quiz_tests.length - 1
                        ].quiz_score + "%"
                      }`}
                    </motion.div>
                  </Typography>
                </Box>
              ) : null}
              {latesttesttime !== undefined ? (
                <Box mt={3}>
                  <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    style={{ fontFamily: "Josefin Sans" }}
                  >
                    <motion.div
                      initial={{ y: 26 * 1.2, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        ease: "easeOut",
                        duration: 1.5,
                        delay: 1.1,
                      }}
                    >
                      The last test was updated {latesttesttime.slice(0, 10)}
                    </motion.div>
                  </Typography>
                </Box>
              ) : null}
              <Box align="center" mt={4}>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1.4 }}
                >
                  <Box display="flex" justifyContent="center">
                    <Box m={(0, 2)}>
                      <CssTextField
                        onChange={onAddCity}
                        value={temp}
                        placeholder="Add Additional City"
                        inputProps={{
                          style: { fontFamily: "nunito", color: "white" },
                        }}
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={4.3}>
                      <Button
                        variant="contained"
                        color="secondary"
                        align="center"
                        onClick={handleAddCity}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box m={(0, 2)}>
                      <CssTextField
                        placeholder="Remove City"
                        inputProps={{
                          style: { fontFamily: "nunito", color: "white" },
                        }}
                        variant="outlined"
                        onChange={onRemoveCity}
                        value={temp}
                      />
                    </Box>
                    <Box mt={4.3}>
                      <Button
                        variant="contained"
                        color="secondary"
                        align="center"
                        onClick={handleRemoveCity}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1.4 }}
                >
                  <Box mt={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      align="center"
                      onClick={() => {
                        setView("report");
                      }}
                    >
                      View Profile{" "}
                    </Button>
                  </Box>
                </motion.div>
              </Box>
              {/* {candidateInfo.coding_tests ? (
              JSON.stringify(candidateInfo.coding_tests)
            ) : (
              <p>No taken the code test yet</p>
            )} */}
            </Box>

            {/* Coding test part */}
            <Box width="40%" height="100vh">
              <Box mt={9}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                  >
                    Test Your Skills
                  </motion.div>
                </Typography>
              </Box>
              <Box align="center">
                <Box align="center" m={7}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("quiz")}
                    >
                      Knowledge Test
                    </Button>
                  </motion.div>
                </Box>
                <Box align="center" m={(4, 7)}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("easy")}
                    >
                      Easy Mode
                    </Button>
                  </motion.div>
                </Box>
                <Box align="center" m={7} onClick={() => setView("medium")}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                  >
                    <Button variant="contained" color="primary">
                      Medium Mode
                    </Button>
                  </motion.div>
                </Box>
                <Box align="center" m={7}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("hard")}
                    >
                      Hard Mode
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      );
    }

    if (view === "quiz") {
      return (
        <QuizApp
          goBackToDashboard={goBackToDashboard}
          id={candidateID}
          handleRefresh={handleRefresh}
        />
      );
    }

    if (view === "easy") {
      return (
        <SandBox
          mode="easy"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
          handleRefresh={handleRefresh}
        />
      );
    }
    if (view === "medium") {
      return (
        <SandBox
          mode="medium"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
          handleRefresh={handleRefresh}
        />
      );
    }
    if (view === "hard") {
      return (
        <SandBox
          mode="hard"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
          handleRefresh={handleRefresh}
        />
      );
    }
    if (view === "report") {
      return (
        <ReportToCandidate
          candidateInfo={candidateInfo}
          goBackToDashboard={goBackToDashboard}
        />
      );
    }
  } else {
    return (
      <p>
        {errorMessage
          ? "Sorry you are not authenticated,please signin first"
          : "It is loading"}
      </p>
    );
  }
}
CandidateDashboard.getInitialProps = async ({ query: { id } }) => {
  try {
    return { candidateID: id };
  } catch (error) {
    return {
      candidateInfo: {
        _id: "dummy",
        candidate_name: "dummy",
        candidate_email: "dummy",
        candidate_city: "dummy",
        coding_tests: "dummy",
      },
    };
  }
};
