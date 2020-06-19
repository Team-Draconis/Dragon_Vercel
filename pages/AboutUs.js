import NavBar from "./src/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";

export default function AboutUs() {
  return (
    <div>
      <NavBar />
      <a href="https://github.com/Team-Draconis/Dragon_Vercel">
        {"Dragon Tester"}
      </a>{" "}
      was developed by{" "}
      <a href="https://www.linkedin.com/in/makokusuda/">Mako Kusudo</a>,{" "}
      <a href="https://www.linkedin.com/in/shuntaro-maekawa/">
        Shuntaro Maekawa
      </a>
      , <a href="https://www.linkedin.com/in/jiayi-min/">Zowie Min</a>,{" "}
      <a href="https://www.linkedin.com/in/tam-nguyen-70a7891a8/">
        {" "}
        Tam Nugyen
      </a>{" "}
      and{" "}
      <a href="https://www.linkedin.com/in/chip-crawford-berkeley/">
        {" "}
        Chip Crawford
      </a>{" "}
      during their time at{" "}
      <a href="https://www.codechrysalis.io/">
        {" "}
        Code Chrysalis Coding Boot Camp
      </a>{" "}
      in Tokyo, Japan. We were inspired by Zowie's experience as a recruiter to
      try to improve the experience for both the companies looking for talent
      and the talent themselves. Our goal was to allow jobseekers to lead with
      their skills and connect them with small to medium sized companies that
      may have been overlooked.
      <br />
      Our focus was on creating a stable platform and refining the skills we
      learned at Code Chrysalis. Mako was in charge of using Docker and
      deploying the app to AWS, she also supported test development. Zowie was
      in charge of Database management and worked on user authentication with
      Tam. Tam helped on the backend, login and test development. Shuntaro
      created the test editor and was our frontend guru. Finally, Chip was the
      tech lead. He helped the team meet deadlines, performed QA tasks and wrote
      small features as needed.
      <br />
      We hope our app can inspire your future projects and lead to a better way
      for people to showcase their talents!
      {/* <img src="/Zowie.jpeg" alt="Zowie Min" />
      <img src="Tam.jpeg" alt="Tam Nguyen" />
      <img src="Shuntaro.jpg" alt="Shuntaro Maekawa" />
      <img src="Mako.jpg" alt="Mako Kusuda" />
      <img src="CC-photo.jpg" alt="Chip Crawford" /> */}
      <Grid container spacing={15}>
        <Grid item xs={3} sm={6} md={2}>
          <img src="/Zowie.jpeg" alt="Zowie Min" height="300px" width="350px" />
        </Grid>
        <Grid item xs={3} sm={6} md={2}>
          <img src="Tam.jpeg" alt="Tam Nguyen" height="300px" width="350px" />
        </Grid>
        <Grid item xs={3} sm={6} md={2}>
          <img
            src="Shuntaro.jpg"
            alt="Shuntaro Maekawa"
            height="300px"
            width="250px"
          />
        </Grid>
        <Grid item xs={3} sm={6} md={2}>
          <img src="Mako.jpg" alt="Mako Kusuda" height="300px" width="250px" />
        </Grid>
        <Grid item xs={3} sm={6} md={2}>
          <img
            src="CC-photo.jpg"
            alt="Chip Crawford"
            height="300px"
            width="250px"
          />
        </Grid>
      </Grid>
    </div>
  );
}
