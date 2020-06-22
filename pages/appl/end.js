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
import { makeStyles } from "@material-ui/styles";

export default function End() {
  const [candidateID, setCandidateID] = useState();

  //responsive styling
  const useStyles = makeStyles((theme) => ({
    box: {
      [theme.breakpoints.down("sm")]: {
        marginTop: "120px",
        fontSize: "3rem",
        width: "80%",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "200px",
        marginBottom: 0,
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "280px",
        marginBottom: 0,
        // background: "green",
      },
    },
  }));

  useEffect(() => {
    const token = localStorage.getItem("candidatetoken");

    verify(token, process.env.SECRET_TOKEN, async function (err, decoded) {
      // must have company token, candidate token could not get the data
      if (!err && decoded.sub) {
        setCandidateID(decoded.sub);
      }
    });
  }, []);

  const classes = useStyles();

  return (
    <>
      {/* <NavBar /> */}
      <Box align="center">
        <motion.div
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
          <p className={classes.box}>Thank You! 🐉</p>
        </motion.div>
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
              setTimeout(Router.push(`/appl/dashboard/${candidateID}`), 4000);
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
