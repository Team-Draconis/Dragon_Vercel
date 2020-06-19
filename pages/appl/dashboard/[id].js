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
import Link from "next/link";

export default function CandidateDashboard({ candidateID }) {
  const router = useRouter();
  let temp;
  let city;
  const [view, setView] = useState("initial");
  const [candidateInfo, setCandidateInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

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
          }
        });
      });
    } else {
      //if there is no token , then force the candidate to sign in
      Router.push("/appl/SignIn");
    }
  }, []);

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
    if (view === "initial") {
      return (
        <div style={{ width: "100%" }}>
          {/* <NavBar /> */}
          <Box display="flex" flexDirection="row">
            {/* User status part */}
            <Box width="60%" bgcolor="#222831">
              <Box style={{ marginRight: "auto" }} m={2}>
                <Link href="/">
                  <motion.img
                    src="/dragon.svg"
                    height="60"
                    width="65"
                    style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1.2 }}
                  />
                </Link>
              </Box>
              <Box mt={12}>
                <Typography
                  variant="h3"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.6, delay: 0.1 }}
                  >
                    {`Welcome Back ${candidateInfo.candidate_name} 🐲`}
                  </motion.div>
                </Typography>
              </Box>
              <Box mt={7}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    {`Email Address: ${candidateInfo.candidate_email}`}
                  </motion.div>
                </Typography>
              </Box>
              <Box mt={7}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    {`Recent Quiz Score: ${
                      candidateInfo.quiz_tests.length !== 0
                        ? candidateInfo.quiz_tests[
                            candidateInfo.quiz_tests.length - 1
                          ].quiz_score + "%"
                        : "NA"
                    }`}
                  </motion.div>
                </Typography>
              </Box>
              <Box mt={7}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    {`You are interested in working in ${candidateInfo.candidate_city}`}
                  </motion.div>
                </Typography>
              </Box>
              <Box align="center" mt={4}>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
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
                  transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
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
            <Box width="40%" height="100vh" bgcolor="#393e46">
              <Box ml={60} mt={3}>
                <Link href="/">
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                  </motion.div>
                </Link>
              </Box>
              <Box mt={15}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    Coding Quiz
                  </motion.div>
                </Typography>
              </Box>
              <Box align="center">
                <Box align="center" m={7}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("quiz")}
                    >
                      Start
                    </Button>
                  </motion.div>
                </Box>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    Coding Challenge
                  </motion.div>
                </Typography>
                <Box align="center" m={(4, 7)}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("easy")}
                    >
                      Start Easy Mode
                    </Button>
                  </motion.div>
                </Box>
                <Box align="center" m={7} onClick={() => setView("medium")}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    <Button variant="contained" color="primary">
                      Start Medium Mode
                    </Button>
                  </motion.div>
                </Box>
                <Box align="center" m={7}>
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setView("hard")}
                    >
                      Start Hard Mode
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
      return <QuizApp goBackToDashboard={goBackToDashboard} id={candidateID} />;
    }

    if (view === "easy") {
      return (
        <SandBox
          mode="easy"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
        />
      );
    }
    if (view === "medium") {
      return (
        <SandBox
          mode="medium"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
        />
      );
    }
    if (view === "hard") {
      return (
        <SandBox
          mode="hard"
          goBackToDashboard={goBackToDashboard}
          candidateID={candidateInfo._id}
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
