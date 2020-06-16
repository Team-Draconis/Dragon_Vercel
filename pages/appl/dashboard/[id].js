//candidate dashboard when they successfully login in
import NavBar from "../../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const LoginPage = dynamic(() => import("../register"));
import SandBox from "../Sandbox";
import QuizApp from "../QuizApp";
import { useRouter, Router } from "next/router";

export default function CandidateDashboard({ candidateID }) {
  const router = useRouter();

  const [view, setView] = useState("initial");
  const [candidateInfo, setCandidateInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(router.query);
    // console.log(candidateID);
    if (localStorage.getItem("candidatetoken") !== null) {
      fetch(`/api/${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("candidatetoken"),
        },
      }).then((res) => {
        res.json().then((res) => {
          console.log(res);
          if (res.message) {
            setErrorMessage(res.message);
            console.log(errorMessage);
          } else {
            setCandidateInfo(res.data);
            console.log(candidateInfo);
          }
        });
      });
    } else {
      //if there is no token , then force the candidate to sign in
      Router.push("/appl/SignIn");
    }
  }, []);

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
        andidate_email: "dummy",
        candidate_city: "dummy",
        coding_tests: "dummy",
      },
    };
  }
};

//   if (localStorage.getItem("candidatetoken") !== null) {
//     console.log(localStorage.getItem("candidatetoken"));
//     fetch(
//       `http://dragontester-env-1.eba-cqpqhfiq.us-east-2.elasticbeanstalk.com/api/${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           token: localStorage.getItem("candidatetoken"),
//         },
//       }
//     ).then((res) => {
//       res.json().then((res) => {
//         return { candidateInfo: data };
//       });
//     });
//   } else {
//     //if there is no token , then force the company to sign in
//     Router.push("/appl/SignIn");
//   }
// };
