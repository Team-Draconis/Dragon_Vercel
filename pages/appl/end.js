// This page is a thank you notes when candidate finished their tests and click the submit button in /sandbox
import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";

export default function End() {
  return (
    <>
      {/* <NavBar /> */}
      <Box mt={30} align="center">
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
      <Box align="center" m={2}>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: -100, fontSize: 120 }}
          transition={{
            delay: 0.2,
            type: "spring",
            yoyo: Infinity,
          }}
        >
          <Link href="/">
            <Button variant="contained" color="primary">
              Close
            </Button>
          </Link>
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
