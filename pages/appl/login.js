import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Splash() {
  return (
    <div>
      <NavBar />
      {/* <Container> */}
      <Box mt={30}>
        <Typography variant="h4" component="h1" align="center">
          <a>Login page</a>
        </Typography>
      </Box>
      <Box align="center" m={10}>
        <Link href="/appl/info">
          <Button variant="contained" color="primary">
            Go to the user profile
          </Button>
        </Link>
      </Box>
      {/* </Container> */}
    </div>
  );
}
