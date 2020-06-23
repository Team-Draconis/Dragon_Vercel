// Shuntaro will update this page with material UI
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { GithubLoginButton, LinkedInLoginButton } from "react-social-login-buttons";
import { useSession, signin, signout } from 'next-auth/client';

import { motion } from "framer-motion";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Dragon Tester
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({ userSession }) {
  const classes = useStyles();

  const [email, setEmail] = useState("your email");
  const [city, setCity] = useState("your city");
  const [name, setName] = useState("your name");
  const [password, setPassword] = useState("your password");

  // --- Tam's Code Start ---

  const [ session, loading ] = useSession();

  // --- Tam's Code End ---

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_name: name,
        candidate_city: city,
        candidate_password: password,
        loginTime: Date().toString(),
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          if (res.authToken) {
            localStorage.setItem("candidatetoken", res.authToken);
            Router.push(`/appl/dashboard/${res.candidateID}`);
            // setIsFinished(true);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-start" m={2.1}>
        <Box style={{ marginRight: "auto" }}>
          <Link href="/">
            <motion.img
              src="/dragon.svg"
              height="60"
              width="65"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.2 }}
            />
          </Link>
        </Box>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  color="primary"
                  placeholder="Your name here"
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: "#616161", borderRadius: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  color="primary"
                  placeholder="City you are interested in"
                  style={{ backgroundColor: "#616161", borderRadius: 3 }}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Your email here"
                  id="email"
                  label="Email Address"
                  color="primary"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: "#616161", borderRadius: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  color="primary"
                  placeholder="Your password here"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: "#616161", borderRadius: 3 }}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
        </form>
            
            <Grid container>
              <Grid item>
                <Link href="/appl/SignIn" variant="body2" color="secondary">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>

            <Grid container>
          <Grid item xs={12}>
            <GithubLoginButton onClick={() => signin('github', { callbackUrl: 'http://localhost:3000/appl/Splash'})}>
              <span>Sign Up With Github</span>
            </GithubLoginButton>
          </Grid>
        </Grid>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
