import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import { HashLink as Scroll } from "react-router-hash-link";
import smoothscroll from "smoothscroll-polyfill";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* width: 100%; */
  height: 100vh;
  margin-top: 150px;
  scroll-behavior: smooth;
`;

const Box = styled.div`
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
  margin-top: 50px;
  justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  margin: 0.5rem;
  margin-top: 2rem;
  justify-content: center;
`;

const TextBox = styled.div`
  text-align: center;
  width: 800px;
  margin-top: 16rem;
`;

class Index extends Component {
  state = {};

  render() {
    return (
      <>
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
              <ButtonBox>
                <Button
                  variant="contained"
                  color="primary"
                  href="/appl/register"
                >
                  Sign Up
                </Button>
              </ButtonBox>
              <ButtonBox>
                <Button variant="contained" color="primary" href="/appl/SignIn">
                  Log In
                </Button>
              </ButtonBox>

              <ButtonBox>
                <Button variant="contained" color="primary" href="/comp/signin">
                  Company Log In
                </Button>
              </ButtonBox>
            </ButtonContainer>
            <ButtonBox>
              <Button variant="contained" color="secondary">
                <AnchorLink
                  href="#detail"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  How it works?
                </AnchorLink>
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
            <ButtonBox>
              <Button variant="contained" color="primary" href="/appl/SignIn">
                Get Started
              </Button>
            </ButtonBox>
          </TextBox>
        </Container>
      </>
    );
  }
}

export default Index;
