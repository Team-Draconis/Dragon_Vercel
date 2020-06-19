import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import { HashLink as Scroll } from "react-router-hash-link";
import smoothscroll from "smoothscroll-polyfill";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "next/link";
import { motion } from "framer-motion";

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
  width: 650px;
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
  margin-top: 0px;
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
        {/* <ThemeProvider theme={theme}> */}
        <Container>
          <BoxContainer>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                align="center"
                style={{ fontFamily: "LilitaOne-Regular", fontSize: 80 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.7 }}
                >
                  Welcome to Dragon Tester
                </motion.div>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                style={{ fontFamily: "Josefin Sans" }}
              >
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  Display your front end skills anonymously
                </motion.div>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="h1"
                align="center"
                style={{ fontFamily: "Josefin Sans" }}
              >
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  {/* Take coding challenge anonymously */}
                </motion.div>
              </Typography>
            </Box>
            <ButtonContainer style={{ marginTop: "20px" }}>
              <ButtonBox>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  <Button variant="contained" color="primary" align="center">
                    <Link href="/appl/register">
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "Josefin Sans",
                          paddingTop: 3,
                        }}
                      >
                        Sign Up
                      </a>
                    </Link>
                  </Button>
                </motion.div>
              </ButtonBox>
              <ButtonBox>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  <Button variant="contained" color="primary">
                    <Link href="/appl/SignIn">
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "Josefin Sans",
                          paddingTop: 3,
                        }}
                      >
                        Log In
                      </a>
                    </Link>
                  </Button>
                </motion.div>
              </ButtonBox>
              <ButtonBox>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href="/comp/signin"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Josefin Sans",
                      paddingTop: 9,
                    }}
                  >
                    {/* <Link href="/comp/signin">
                    <a style={{ textDecoration: "none", color: "white" }}> */}
                    Company Log In
                    {/* </a> */}
                    {/* </Link> */}
                  </Button>
                </motion.div>
              </ButtonBox>
            </ButtonContainer>
            <ButtonContainer>
              <ButtonBox>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  <Button variant="contained" color="secondary">
                    <AnchorLink
                      href="#detail"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "Josefin Sans",
                        paddingTop: 4,
                      }}
                    >
                      How it works
                    </AnchorLink>
                  </Button>
                </motion.div>
              </ButtonBox>
              <ButtonBox>
                <motion.div
                  initial={{ y: 26 * 1.2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                >
                  <Button href="AboutUs" variant="contained" color="secondary">
                    {/* <Link href="AboutUs">
                      <a
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontFamily: "Josefin Sans",
                          paddingTop: 4,
                        }}
                      > */}
                    About Us
                    {/* </a>
                    </Link> */}
                  </Button>
                </motion.div>
              </ButtonBox>
            </ButtonContainer>
          </BoxContainer>
          <Box>
            <motion.img
              src="/dragon.svg"
              alt="dragon"
              width="450"
              height="450"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ yoyo: Infinity, duration: 1.0, ease: "easeOut" }}
            />
          </Box>
        </Container>
        <Container id="detail">
          <TextBox>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{ fontFamily: "Josefin Sans" }}
            >
              We bypass recruiters and algorithms which may introduce
              unconscious bias and allow your skill to open doors. We retain
              only your email address and location preference. Feel free to take
              the tests multiple times and look for jobs across the globe.
            </Typography>
            <ButtonBox>
              <Button variant="contained" color="primary">
                <Link href="/appl/register">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Josefin Sans",
                      paddingTop: 3,
                    }}
                  >
                    Get Started
                  </a>
                </Link>
              </Button>
            </ButtonBox>
          </TextBox>
        </Container>
        {/* </ThemeProvider> */}
      </>
    );
  }
}

export default Index;
