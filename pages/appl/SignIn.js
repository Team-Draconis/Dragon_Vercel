import React, { useEffect, useState, useRef } from "react";
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
import Router from "next/router";
import { useForm } from "react-hook-form";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handelLogin is happending ");
    fetch("/api/candidateLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_password: password,
      }),
    }).then((res) => {
      console.log("should direct to candidate dashboard which is /appl/info");
      //This router direct not working at this moment
      if (res.ok) {
        Router.push("/appl/info");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link href="info">
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

// import { useEffect, useState, useRef } from "react";
// import NavBar from "./NavBar";
// import Router from "next/router";

// function Index() {
//   const [email, setEmail] = useState("your email");
//   const [password, setPassword] = useState("your password");
//   const handleLogin = (e) => {
//     e.preventDefault();
//     fetch("/api/candidateLogin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         candidate_email: email,
//         candidate_password: password,
//       }),
//     })
//       .then((res) => {
//         console.log(res.status);
//         // Do a fast client-side transition to the already prefetched dashboard page
//         if (res.status === 200) {
//           Router.push("/appl/end");
//         }
//       })
//       .catch((error) => {
//         console.log(error); // add more detail error later
//       });
//   };

//   return (
//     <div>
//       <NavBar />
//       <h3>Applicant Login page</h3>
//       <h4>
//         Welcome to Dragon Tester where you can display your skills. At Dragon
//         Tester you can anonomously take a react coding test and have it be
//         reviewed by leading companies around the globe. Based on the location
//         you choose, local companies will review your results and reach out to
//         you if they are interested.
//       </h4>
//       <h4>
//         We bypass recruiters and algorithms which may introduce unconscious bias
//         and allow your skill to open doors. We retain only your email address
//         and location preference. Feel free to take the tests multiple times and
//         look for jobs across the globe.
//       </h4>

//       <form>
//         Email:{" "}
//         <input
//           type="text"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />{" "}
//         <br />
//         Password:{" "}
//         <input
//           type="text"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />{" "}
//         <br />
//         <input onClick={handleLogin} type="submit" value="Login" />
//       </form>

//       <a href="/appl/splash" className="card">
//         <h3>Go to the splash page</h3>
//       </a>
//       <h2>
//         Don't have an account? Register from{" "}
//         <a href="/appl/register" className="card">
//           here
//         </a>
//       </h2>
//     </div>
//   );
