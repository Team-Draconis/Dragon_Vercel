import NavBar from "../NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
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
    </>
  );
}
