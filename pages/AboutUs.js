import NavBar from "./src/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default function AboutUs() {
  return (
    <div>
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
      <Container>
        <Typography
          variant="body1"
          component="h1"
          align="center"
          style={{ fontFamily: "Josefin Sans" }}
        >
          <motion.div
            initial={{ y: 26 * 1.2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
          >
            Coding Quiz
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
            in Tokyo, Japan. We were inspired by Zowie's experience as a
            recruiter to try to improve the experience for both the companies
            looking for talent and the talent themselves. Our goal was to allow
            jobseekers to lead with their skills and connect them with small to
            medium sized companies that may have been overlooked.
            <br />
            Our focus was on creating a stable platform and refining the skills
            we learned at Code Chrysalis. Mako was in charge of using Docker and
            deploying the app to AWS, she also supported test development. Zowie
            was in charge of Database management and worked on user
            authentication with Tam. Tam helped on the backend, login and test
            development. Shuntaro created the test editor and was our frontend
            guru. Finally, Chip was the tech lead. He helped the team meet
            deadlines, performed QA tasks and wrote small features as needed.
            <br />
            We hope our app can inspire your future projects and lead to a
            better way for people to showcase their talents!
          </motion.div>
        </Typography>
        {/* <img src="/Zowie.jpeg" alt="Zowie Min" />
      <img src="Tam.jpeg" alt="Tam Nguyen" />
      <img src="Shuntaro.jpg" alt="Shuntaro Maekawa" />
      <img src="Mako.jpg" alt="Mako Kusuda" />
      <img src="CC-photo.jpg" alt="Chip Crawford" /> */}
        {/* <Container> */}
        <Grid container spacing={1} align="center">
          <Grid item xs={12} sm={6} md={6}>
            <img
              src="/Zowie_thumb.jpeg"
              alt="Zowie Min"
              width="200"
              height="230"
              style={{ borderRadius: "50%" }}
            />
            <a href="https://www.linkedin.com/in/jiayi-min/">Zowie Min</a>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img
              src="Tam_thumb.jpeg"
              alt="Tam Nguyen"
              width="200"
              height="230"
              style={{ borderRadius: "50%" }}
            />
            <a href="https://www.linkedin.com/in/tam-nguyen-70a7891a8/">
              Tam Nugyen
            </a>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <img
              src="Shuntaro_thumb.jpg"
              alt="Shuntaro Maekawa"
              width="200"
              height="230"
              style={{ borderRadius: "50%" }}
            />
            <a href="https://www.linkedin.com/in/shuntaro-maekawa/">
              Shuntaro Maekawa
            </a>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <img
              src="Mako_thumb.jpg"
              alt="Mako Kusuda"
              width="200"
              height="230"
              style={{ borderRadius: "50%" }}
            />
            <a href="https://www.linkedin.com/in/makokusuda/">Mako Kusudo</a>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <img
              src="CC-photo_thumb.jpg"
              alt="Chip Crawford"
              width="200"
              height="230"
              style={{ borderRadius: "50%" }}
            />
            <a href="https://www.linkedin.com/in/chip-crawford-berkeley/">
              Chip Crawford
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
