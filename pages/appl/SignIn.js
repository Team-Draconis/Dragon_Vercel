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
import { motion } from "framer-motion";
import { GithubLoginButton } from "react-social-login-buttons";
import { useSession, signin } from 'next-auth/client';
import ThreeDotsWave from '../src/ThreeDotsWave';

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

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // --- Tam's Code Begin ---

  const [ session, loading ] = useSession();

  // --- Tam's Code End ---

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/candidateLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_password: password,
        loginTime: Date().toString(),
      }),
    }).then((res) => {
      res.json().then((res) => {
        if (res.authToken) {
          localStorage.setItem("candidatetoken", res.authToken);
          Router.push(`/appl/dashboard/${res.candidateID}`);
        } else {
          setErrorMessage("Please input correct email and password");
        }
      });
    });
  };



  const handleLoginWithGitHub = (session) => {

    // console.log(session, "<--- session in handleLoginWithGithub");

    fetch("https://api.github.com/user", {
            headers: {
                Authorization: `token ${session.account.accessToken}`
            }
    })
      .then((res) => res.json())
      .then((res) => { 
      console.log(res, "WE TALKED TO THE GITHUB API AND IT'S A LEGIT TOKEN");
      console.log(session, "WE STILL HAVE THE SESSION WITHIN THE PROMISE");
        
        let userObj = {
          userEmail: session.user.email,
          userGithubToken: session.account.accessToken,
        }

        if(res.id === session.account.id) {
          return userObj;
        } else {
          return undefined;
        }
      }).then((res) => {
        if(res === undefined) {
          console.log("the token does not match the profile");
          return;
        }

        console.log(res, "Bypassed Verification");
        
        fetch("/api/githubLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            candidate_email: res.userEmail,
            candidate_github_token: res.userGithubToken,
            loginTime: Date().toString(),
          }),
        }).then((res) => {
              res.json()
            .then((res) => {
              console.log(res, "<-- res");
              console.log(res.authToken, "<-- res.authToken");
                if (res.authToken) {
                  localStorage.setItem("candidatetoken", res.authToken);
                  if(res.githubToken === localStorage.GithubAccessToken){
                    Router.push(`/appl/dashboard/${res.candidateID}`);}
                } else {
                  setErrorMessage("Please input correct email and password");
                }
          })})
        }).catch((err) => console.log(err, "Not working Token"));
  };


if(!session) {
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
              color="secondary"
              placeholder="Your email here"
              style={{ backgroundColor: "#616161", borderRadius: 3 }}
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
              color="secondary"
              placeholder="Your password here"
              style={{ backgroundColor: "#616161", borderRadius: 3 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
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
              <Grid item>
                <Link href="/appl/register" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Grid item xs={12}>
                  <GithubLoginButton onClick={() => {signin('github')}}>
                    <span>Sign In With Github</span>
                  </GithubLoginButton>
                </Grid>
          <h2>{errorMessage}</h2>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
if(session) {
  return (
    <> 
      {console.log(session, "<--- this is the Session")}
      {localStorage.setItem('GithubAccessToken',session.account.accessToken)}
      {handleLoginWithGitHub(session)}
      <p></p>
      <ThreeDotsWave />
    </>
  )
}
}




//   return (
//     <>
//       <div>
//         <Box display="flex" justifyContent="flex-start" m={2.1}>
//           <Box style={{ marginRight: "auto" }}>
//             <Link href="/">
//               <motion.img
//                 src="/dragon.svg"
//                 height="60"
//                 width="65"
//                 style={{ cursor: "pointer" }}
//                 whileHover={{ scale: 1.2 }}
//               />
//             </Link>
//           </Box>
//         </Box>
//       </div>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography
//             component="h1"
//             variant="h5"
//             style={{ fontFamily: "Josefin Sans" }}
//           >
//             Log in
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               color="secondary"
//               placeholder="Your email here"
//               style={{ backgroundColor: "#616161", borderRadius: 3 }}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               color="secondary"
//               placeholder="Your password here"
//               style={{ backgroundColor: "#616161", borderRadius: 3 }}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="secondary" />}
//               label="Remember me"
//             />
//             <Link href="info">
//               <Button
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//                 onClick={handleLogin}
//               >
//                 Log In
//               </Button>
//             </Link>
//             <Grid container>
//               <Grid item>
//                 <Link href="/appl/register" variant="body2" color="secondary">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//           <Grid container>
//             <p>
//               {!session && <> 
//                 <Grid item xs={12}>
//                   <GithubLoginButton onClick={() => {signin('github')}}>
//                     <span>Sign In With Github</span>
//                   </GithubLoginButton>
//                 </Grid>
//               </>}
//               {session && <> 
//                 Signed in as {session.user.name} <br/>
//                 {console.log(session, "<--- this is the Session")}
//                 {localStorage.setItem('GithubAccessToken',session.account.accessToken)}
//                 <Button
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={handleLoginWithGitHub(session)}
//                 >
//                   Logged in and want to test
//                 </Button>
//               </>
//               }
//             </p>
//           </Grid>
//           <h2>{errorMessage}</h2>
//         </div>
//         <Box mt={8}>
//           <Copyright />
//         </Box>
//       </Container>
//     </>
//   );
// }