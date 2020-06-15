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

export default function CandidateDashboard({ candidateInfo }) {
  let temp
  let city
  const [view, setView] = useState("initial");
  const onAddCity = ({ target: { value } }) => {
    console.log(value);
    city = value;
  };
  const handleAddCity = () => {
    console.log(city)
  };

  const goBackToDashboard = () => {
    setView("initial");
  };

  if (candidateInfo) {
    if (view === "initial") {
      return (
        <div>
          <NavBar />
          <Box mt={30}>
            <Typography variant="h4" component="h1" align="center">
              {`Welcome to Dragon, ${candidateInfo.candidate_name}`}
            </Typography>
            <input type="text" onChange={onAddCity} value={temp} />
            <button onClick={handleAddCity}>Add Additional City</button>
            <p>{candidateInfo.candidate_email}</p>
            <p>{candidateInfo.candidate_city}</p>
            {candidateInfo.coding_tests ? (
              JSON.stringify(candidateInfo.coding_tests)
            ) : (
              <p>No taken the code test yet</p>
            )}
          </Box>
          <Box align="center" m={10}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setView("quiz")}
            >
              Quiz Test
            </Button>
          </Box>
          <Box align="center" m={10}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setView("easy")}
            >
              Easy Mode
            </Button>
          </Box>

          <Box align="center" m={10} onClick={() => setView("medium")}>
            <Button variant="contained" color="primary">
              Medium Mode
            </Button>
          </Box>
          <Box align="center" m={10}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setView("hard")}
            >
              Hard Mode
            </Button>
          </Box>
        </div>
      );
    }

    if (view === "quiz") {
      return <QuizApp goBackToDashboard={goBackToDashboard} />;
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
        andidate_email: "dummy",
        candidate_city: "dummy",
        coding_tests: "dummy",
      },
    };
  }
};
