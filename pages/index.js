import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";
import { HashLink as Scroll } from "react-router-hash-link";
import smoothscroll from "smoothscroll-polyfill";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "next/link";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme, StylesProvider } from "@material-ui/core/styles";

const Container = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    /* background-color: purple; */
    flex-direction: column;
    /* margin: auto; */
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100vh;
    margin-top: 150px;
    scroll-behavior: smooth;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100vh;
    margin-top: 150px;
    scroll-behavior: smooth;
  }
`;

const BoxContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    /* background-color: grey; */
    /* margin-top: 2rem; */
    /* flex-direction: column;
    margin: auto; */
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-bottom: 35px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-bottom: 35px;
  }
`;

const Box = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    /* background-color: grey;
    flex-direction: column;
    margin: auto;
    width: 100%; */
    /* width: 100%; */
    text-align: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    text-align: center;
    width: 650px;
    margin-top: 0.8rem;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    text-align: center;
    width: 650px;
    margin-top: 0.8rem;
  }
`;

const ButtonContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* margin-top: 20px; */
  }
`;

const ButtonContainer2 = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    margin-top: 3px;
    justify-content: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* margin-top: 20px; */
  }
`;

const ButtonBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    /* width: 90%; */
    margin: 0.3rem;
    text-align: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    margin: 0.5rem;
    /* margin-top: 2rem; */
    justify-content: center;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    margin: 0.5rem;
    /* margin-top: 2rem; */
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: -2rem;
    text-align: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 3rem;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-top: 3rem;
  }
`;

const TextBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    /* background-color: grey;
    flex-direction: column;
    margin: auto;
    width: 100%; */
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    text-align: center;
    width: 800px;
    margin-top: 16rem;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    text-align: center;
    width: 800px;
    margin-top: 16rem;
  }
`;

const Typography = styled.div`
  font-family: "LilitaOne-Regular";
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 41px;
    text-align: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 80px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 80px;
  }
`;

const Typography2 = styled.div`
  font-family: "LilitaOne-Regular";
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 18px;
    text-align: center;
    padding-top: 5px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 32px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 32px;
  }
`;

const Typography3 = styled.div`
  font-family: "LilitaOne-Regular";
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 20px;
    text-align: center;
    margin: 25px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 32px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 32px;
  }
`;

const Img = styled.img`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
    height: 450px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 450px;
    height: 450px;
  }
`;

const Img2 = styled.img`
  /* src: "/dragon.svg";
  alt: "dragon"; */
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 130px;
    height: 190px;
    align-items: center;
    margin-top: -25px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: none;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: none;
  }
`;

const Footer = styled.div`
  /* src: "/dragon.svg";
  alt: "dragon"; */
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    height: 30px;
    align-items: center;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 100%;
    height: 30px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 100%;
    height: 30px;
  }
`;

export default function Index() {
  // const classes = useStyles();
  const muiTheme = useTheme();
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <StylesProvider injectFirst>
        <SCThemeProvider theme={muiTheme}>
          <Container>
            <BoxContainer>
              <Box>
                <Typography
                  // variant="h2"
                  // component="h1"
                  // gutterBottom
                  align="center"
                  style={{ fontFamily: "LilitaOne-Regular" }}
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
                <Typography2 variant="h4" component="h1">
                  <motion.div
                    initial={{ y: 26 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                  >
                    Display your front end skills anonymously
                  </motion.div>
                </Typography2>
              </Box>
              <Box>
                <motion.div
                  src="/dragon.svg"
                  alt="dragon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    yoyo: Infinity,
                    duration: 1.0,
                    ease: "easeOut",
                  }}
                >
                  <Img2 src="/dragon.svg" alt="dragon" />
                </motion.div>
              </Box>
              {/* <Box>
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
              {/* </motion.div>
                </Typography>
              </Box> */}
              <Wrapper>
                <ButtonContainer>
                  <ButtonBox>
                    <motion.div
                      initial={{ y: 26 * 1.2, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        align="center"
                        fullWidth
                      >
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
                      <Button variant="contained" color="primary" fullWidth>
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
                        fullWidth
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
                <ButtonContainer2>
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
                      <Button variant="contained" color="secondary">
                        <Link href="AboutUs">
                          <a
                            style={{
                              textDecoration: "none",
                              color: "white",
                              fontFamily: "Josefin Sans",
                              paddingTop: 4,
                            }}
                          >
                            About Us
                          </a>
                        </Link>
                      </Button>
                    </motion.div>
                  </ButtonBox>
                </ButtonContainer2>
              </Wrapper>
            </BoxContainer>
            <Box>
              <motion.div
                src="/dragon.svg"
                alt="dragon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  yoyo: Infinity,
                  duration: 1.0,
                  ease: "easeOut",
                }}
              >
                <Img src="/dragon.svg" alt="dragon" />
              </motion.div>
            </Box>
          </Container>
          <Container id="detail">
            <TextBox>
              <Typography3 variant="h4" component="h1" align="center">
                We bypass recruiters and algorithms which may introduce
                unconscious bias and allow your skill to open doors. We retain
                only your email address and location preference. Feel free to
                take the tests multiple times and look for jobs across the
                globe.
              </Typography3>
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
          <Footer></Footer>
        </SCThemeProvider>
      </StylesProvider>
    </>
  );
}

// export default Index;
