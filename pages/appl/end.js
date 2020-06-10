import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function End() {
  return (
    <>
      <NavBar />
      <Box mt={30}>
        <Typography variant="h4" component="h1" align="center">
          Thank You! 🐉
        </Typography>
      </Box>
      <Box align="center" m={10}>
        <Link href="/">
          <Button variant="contained" color="primary">
            Close
          </Button>
        </Link>
      </Box>
      {/* <div>
        <h3>Thank you!</h3>
        <h3>Close page</h3>
        <h4>Need to add option to sign out or to take another exam</h4>
      </div> */}
    </>
  );
}
