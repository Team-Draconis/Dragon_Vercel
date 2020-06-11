// This is candidate indivisual dashboard after they successfully login-in
// This route should be protected

import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Info() {
  return (
    <div>
      <NavBar />
      <Box mt={30}>
        <Typography variant="h4" component="h1" align="center">
          User profile page
        </Typography>
      </Box>
      {/* <h4>
        This page will contain the forms for submitting your email address and
        city preference
      </h4>
      <h4>
        We may also want to allow the user to select a difficulty setting for
        the test
      </h4>
      <h4>
        Part of the MVP is a user profile. We should allow the User to review
        their previous tests and delete them as needed.
      </h4> */}

      <Box align="center" m={10}>
        <Link href="/appl/Sandbox">
          <Button variant="contained" color="primary">
            Start Coding Test
          </Button>
        </Link>
      </Box>
    </div>
  );
}
