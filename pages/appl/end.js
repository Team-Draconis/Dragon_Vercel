// This page is a thank you notes when candidate finished their tests and click the submit button in /sandbox
import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { verify } from "jsonwebtoken";
import Router from "next/router";

export default function End() {
  const [candidateID, setCandidateID] = useState();

  useEffect(() => {
    const token = localStorage.getItem("candidatetoken");

    verify(token, process.env.SECRET_TOKEN, async function (err, decoded) {
      // must have company token, candidate token could not get the data
      if (!err && decoded.sub) {
        setCandidateID(decoded.sub);
      }
    });
  }, []);
  return (
    <>
      {/* <NavBar /> */}
      <Box mt={35} align="center">
        <motion.h2
          initial={{ y: -250 }}
          animate={{ y: -10, fontSize: 120 }}
          transition={{
            delay: 0.2,
            type: "spring",
          }}
          style={{
            fontFamily: "Josefin Sans",
          }}
        >
          Thank You! 🐉
        </motion.h2>
      </Box>
      <Box align="center" m={5}>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: -100, fontSize: 120 }}
          transition={{
            delay: 0.2,
            type: "spring",
            yoyo: Infinity,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setTimeout(Router.push(`/appl/dashboard/${candidateID}`), 3500);
              // Router.push(`/appl/dashboard/${candidateID}`);
            }}
          >
            Go back to dashboard
          </Button>
        </motion.div>
      </Box>
      {/* <div>
        <h3>Thank you!</h3>
        <h3>Close page</h3>
        <h4>Need to add option to sign out or to take another exam</h4>
      </div> */}
    </>
  );
}
