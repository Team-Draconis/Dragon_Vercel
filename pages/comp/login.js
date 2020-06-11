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
      <Box mt={30}>
        <Typography variant="h4" component="h1" align="center">
          <a>Company Login Page</a>
        </Typography>
      </Box>
      <Box align="center" m={10}>
        <Link href="/comp/dash">
          <Button variant="contained" color="primary">
            Go to dashboard
          </Button>
        </Link>
      </Box>
      {/* <h3>Company Login page</h3>
      <h4>We will need to make a simple company login here</h4>
      <a href="/comp/dash" className="card">
        <h3>Go to the dashboard</h3>
      </a> */}
    </div>
  );
}
