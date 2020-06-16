//candidate dashboard when they successfully login in
import NavBar from "../../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
import { useState } from "react";
const LoginPage = dynamic(() => import("../register"));
import SandBox from "../Sandbox";
import QuizApp from "../QuizApp";
import { motion } from "framer-motion";

export default function CandidateDashboard({ candidateInfo }) {
  let temp;
  let city;
  const [view, setView] = useState("initial");
  
  const onAddCity = ({ target: { value } }) => {
    console.log(value);
    city = value;
  };
  
  const handleAddCity = (e) => {
    e.preventDefault();
    console.log(city);
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
          console.log("$$$", res.id);
          Router.push(`/appl/dashboard/${res.id}`);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  
  const goBackToDashboard = () => {
    setView("initial");
  };

  if (candidateInfo) {
    if (view === "initial") {
      return (
        <div>
          <NavBar />
          {/* <Box display="flex">
            <Box>HOME</Box>
            <Box ml={165}>Log Out</Box>
          </Box> */}
          <Box mt={22}>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              style={{ fontFamily: "Josefin Sans" }}
            >
              <motion.div
                initial={{ y: 26 * 1.2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1.5, delay: 0.7 }}
              >
                {`Hello ${candidateInfo.candidate_name} 🐲  This is your dashboard`}
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
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1.2 }}
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
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1.7 }}
                >
                  {`You are interested in working in ${candidateInfo.candidate_city}`}
                </motion.div>
              </Typography>
            </Box>
            <input type="text" onChange={onAddCity} value={temp} />
            <button onClick={handleAddCity}>Add Additional City</button>
            {/* {candidateInfo.coding_tests ? (
              JSON.stringify(candidateInfo.coding_tests)
            ) : (
              <p>No taken the code test yet</p>
            )} */}
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
                transition={{ ease: "easeOut", duration: 1.5, delay: 2.2 }}
              >
                Test Your Skills
              </motion.div>
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box align="center" m={8}>
              <motion.div
                initial={{ y: 26 * 1.2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1.5, delay: 2.2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setView("quiz")}
                >
                  Quiz Test
                </Button>
              </motion.div>
            </Box>
            <Box align="center" m={8}>
              <motion.div
                initial={{ y: 26 * 1.2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1.5, delay: 2.2 }}
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

            <Box align="center" m={8} onClick={() => setView("medium")}>
              <motion.div
                initial={{ y: 26 * 1.2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1.5, delay: 2.2 }}
              >
                <Button variant="contained" color="primary">
                  Medium Mode
                </Button>
              </motion.div>
            </Box>
            <Box align="center" m={8}>
              <motion.div
                initial={{ y: 26 * 1.2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1.5, delay: 2.2 }}
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
        </div>
      );
    }

    if (view === "quiz") {
      return <QuizApp />;
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
  } else {
    return <p>nothing</p>;
  }
}
CandidateDashboard.getInitialProps = async ({ query: { id } }) => {
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
        candidate_email: "dummy",
        candidate_city: "dummy",
        coding_tests: "dummy",
      },
    };
  }
};
