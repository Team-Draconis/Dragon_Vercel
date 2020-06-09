import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import NavBar from "./src/NavBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";

class Index extends Component {
  state = {};
  render() {
    const handleSubmit = (e) => {
      console.log(e);
    };
    return (
      // <Container maxWidth="lg">
      <>
        <NavBar />
        <Container align="center">
          <Box m={4}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              Welcome to Dragon Tester
            </Typography>
          </Box>
          <Container align="center">
            <img src="/dragon.jpg" alt="dragon" width="250" height="250" />
          </Container>
          <Box m={4}>
            <Typography variant="body1" component="h1" align="center">
              Welcome to Dragon Tester where you can display your skills. At
              Dragon Tester you can anonomously take a react coding test and
              have it be reviewed by leading companies around the globe. Based
              on the location you choose, local companies will review your
              results and reach out to you if they are interested.
            </Typography>
          </Box>

          <Box m={4}>
            <Typography variant="body1" component="h1" align="center">
              We bypass recruiters and algorithms which may introduce
              unconscious bias and allow your skill to open doors. We retain
              only your email address and location preference. Feel free to take
              the tests multiple times and look for jobs across the globe.
            </Typography>
          </Box>

          <Box m={10}>
            <Button variant="contained" color="primary" href="/">
              Sign Up
            </Button>
          </Box>

          {/* <form>
            Name: <input type="text" name="fname" /> <br />
            Email: <input type="text" name="femail" /> <br />
            <input onClick={handleSubmit} type="submit" />
          </form>
          <a href="/appl/splash" className="card">
            <h3>Go to the splash page</h3>
          </a>
          <a href="/appl/register" className="card">
            <h3>Register</h3>
          </a> */}
        </Container>
      </>
    );
  }
}

export default Index;
