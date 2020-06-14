import React, { Component } from "react";
// import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
// import Box from "@material-ui/core/Box";
// import CardMedia from "@material-ui/core/CardMedia";
import styled from "styled-components";
// import Navbar from "./src/NavBar";
import { motion } from "framer-motion";

// const Test = styled.div`
//   width: 960px;
//   height: 100vh;
//   margin: 2rem auto;
//   padding: 2rem;
//   background: #f2f2f2;
// `;
// const Heading = styled.h1``;

// const media = styled.div``;

const Parent = styled.div`
  position: flex;
  /* justify-content: center; */
`;

const Container = styled.div`
  /* background-color: grey; */
  /* text-align: center; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* width: 100%; */
  height: 100vh;
  margin-top: 150px;
`;

const Box = styled.div`
  /* background-color: darkred; */
  text-align: center;
  width: 500px;
  margin-top: 0.8rem;
`;

const BoxContainer = styled.div`
  /* background-color: darkblue; */
  /* direction: column; */
  /* justify-content: space-between; */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: green; */
  margin-top: 50px;
  justify-content: center;
`;

const ButtonBox = styled.div`
  /* background-color: yellow; */
  display: flex;
  margin: 0.5rem;
  margin-top: 2rem;
  justify-content: center;
`;

const Scroll = styled.div`
  background: white;
  border-radius: 30px;
  width: 150px;
  height: 150px;
`;

const TextBox = styled.div`
  /* background-color: darkred; */
  text-align: center;
  width: 800px;
  margin-top: 16rem;
`;

class Index extends Component {
  state = {};

  render() {
    return (
      // <Container maxWidth="lg">
      <>
        {/* <Parent> */}
        <Container>
          <BoxContainer>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                align="center"
              >
                Welcome to Dragon Tester
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" component="h1" align="center">
                Display your skills
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h1" align="center">
                Take coding challenge anonymously
              </Typography>
            </Box>
            <ButtonContainer>
              {/* <Box> */}
              <ButtonBox>
                <Button
                  variant="contained"
                  color="primary"
                  href="/appl/register"
                >
                  Sign Up
                </Button>
              </ButtonBox>
              {/* </Box> */}

              {/* <Box> */}
              <ButtonBox>
                <Button variant="contained" color="primary" href="/appl/SignIn">
                  Log In
                </Button>
              </ButtonBox>
              {/* </Box> */}

              {/* <Box> */}
              <ButtonBox>
                <Button variant="contained" color="primary" href="/comp/signin">
                  Company Log In
                </Button>
              </ButtonBox>
              {/* </Box> */}
            </ButtonContainer>
            <ButtonBox>
              <Button variant="contained" color="secondary" href="#detail">
                How it works?
              </Button>
            </ButtonBox>
          </BoxContainer>
          <Box>
            <img src="/dragon.jpg" alt="dragon" width="250" height="250" />
          </Box>
        </Container>
        <Container id="detail">
          <TextBox>
            <Typography variant="h4" component="h1" align="center">
              We bypass recruiters and algorithms which may introduce
              unconscious bias and allow your skill to open doors. We retain
              only your email address and location preference. Feel free to take
              the tests multiple times and look for jobs across the globe.
            </Typography>
          </TextBox>
        </Container>
        {/* </Parent> */}
      </>
    );
  }
}

export default Index;
