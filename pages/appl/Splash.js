import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Router from "next/router";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";

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
    marginTop: theme.spacing(9),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Splash = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("your city");
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState();

  useEffect(async (context) => {
    const ses = await getSession(context);
    setSession(ses);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_name: session.user.name,
        candidate_city: city,
        candidate_password: session.account.accessToken,
        candidate_githubId: session.account.id,
        loginTime: Date().toString(),
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          if (res.authToken) {
            localStorage.setItem("candidatetoken", res.authToken);
            Router.push(`/appl/dashboard/${res.candidateID}`);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterWithEmail = (e) => {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: session.user.email,
        candidate_name: session.user.name,
        candidate_city: city,
        candidate_password: session.account.accessToken,
        candidate_githubId: session.account.id,
        loginTime: Date().toString(),
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          if (res.authToken) {
            localStorage.setItem("candidatetoken", res.authToken);
            Router.push(`/appl/dashboard/${res.candidateID}`);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  if (session) {
    if (!session.user.email) {
      return (
        <>
          <div>
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
          </div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ fontFamily: "Josefin Sans" }}
              >
                Registration
              </Typography>
              <h3>
                Please enter an e-mail address and city you would like to work
                in so recruiters may contact you.
              </h3>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  color="secondary"
                  placeholder="Your email here"
                  style={{ borderRadius: 3 }}
                />

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    color="secondary"
                    placeholder="City you are interested in"
                    // autoComplete="city"
                    // value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>

                <Link href="info">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRegister}
                  >
                    Submit
                  </Button>
                </Link>
              </form>
              <h2>{errorMessage}</h2>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </>
      );
    } else if (session.user.email) {
      return (
        <>
          <div>
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
          </div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ fontFamily: "Josefin Sans" }}
              >
                Registration
              </Typography>
              <h3>
                Please enter a city you would like to work in so recruiters may
                contact you.
              </h3>
              <form className={classes.form} noValidate>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    color="secondary"
                    placeholder="City you are interested in"
                    // autoComplete="city"
                    // value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>

                <Link href="info">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRegisterWithEmail}
                  >
                    Submit
                  </Button>
                </Link>
              </form>
              <h2>{errorMessage}</h2>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </>
      );
    }
  } else {
    return <p></p>;
  }
};

export default Splash;
