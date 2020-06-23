import NavBar from "./src/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { BottomNavigation } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/styles";

export default function AboutUs() {
  //responsive styling
  const useStyles = makeStyles((theme) => ({
    icon: {
      color: "white",
      "&:hover": {
        color: "#0073b1",
        backgroundColor: "white",
      },
      marginRight: "0.4rem",
    },
    icon2: {
      color: "white",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
      },
    },
  }));

  const classes = useStyles();

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
      <Container>
        <motion.div
          initial={{ y: 26 * 1.2, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
        >
          <Box mb={3}>
            <Typography
              variant="h4"
              component="h1"
              style={{ fontFamily: "Josefin Sans" }}
            >
              Our Team
            </Typography>
          </Box>
          <Grid container spacing={3} align="center">
            <Grid item xs={12} sm={6} md={6}>
              <img
                src="/Zowie_thumb.jpg"
                alt="Zowie Min"
                width="200"
                height="230"
                style={{ borderRadius: "50%" }}
              />
              <Grid item md={6}>
                <Typography
                  color="primary"
                  variant="h5"
                  component="h1"
                  align="center"
                  style={{
                    fontFamily: "Josefin Sans",
                  }}
                >
                  Zowie Min
                </Typography>
                <Link href="https://www.linkedin.com/in/jiayi-min/">
                  <LinkedInIcon
                    whileHover={{ scale: 1.3 }}
                    className={classes.icon}
                  />
                </Link>
                {"     "}{" "}
                <Link href="https://github.com/Zowie0122">
                  <GitHubIcon className={classes.icon2} />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <img
                src="TamNguyen.jpg"
                alt="Tam Nguyen"
                width="200"
                height="230"
                style={{ borderRadius: "50%" }}
              />
              <Grid item md={6}>
                <Typography
                  color="primary"
                  variant="h5"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  Tam Nguyen
                </Typography>
                <Link href="https://www.linkedin.com/in/tam-nguyen-70a7891a8/">
                  <LinkedInIcon className={classes.icon} />
                </Link>
                {"  "}
                <Link href="https://github.com/softwaredeveloptam">
                  <GitHubIcon className={classes.icon2} />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <img
                src="Shuntaro_thumb.jpg"
                alt="Shuntaro Maekawa"
                width="200"
                height="230"
                style={{ borderRadius: "50%" }}
              />
              <Grid item md={8}>
                <Typography
                  variant="h5"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                  color="primary"
                >
                  Shuntaro Maekawa
                </Typography>
                <Link href="https://www.linkedin.com/in/shuntaro-maekawa/">
                  <LinkedInIcon className={classes.icon} />
                </Link>
                {"  "}
                <Link href="https://github.com/maegatro">
                  <GitHubIcon className={classes.icon2} />
                </Link>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <img
                src="Mako_thumb.jpg"
                alt="Mako Kusuda"
                width="200"
                height="230"
                style={{ borderRadius: "50%" }}
              />
              <Grid item md={6}>
                <Typography
                  variant="h5"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                  color="primary"
                >
                  Mako Kusuda
                </Typography>
                <Link href="https://www.linkedin.com/in/makokusuda/">
                  <LinkedInIcon className={classes.icon} />
                </Link>
                {"  "}
                <Link href="https://github.com/makokusuda">
                  <GitHubIcon className={classes.icon2} />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <img
                src="CC-photo_thumb.jpg"
                alt="Chip Crawford"
                width="200"
                height="230"
                style={{ borderRadius: "50%" }}
              />
              <Grid item md={6}>
                <Typography
                  variant="h5"
                  component="h1"
                  align="center"
                  style={{ fontFamily: "Josefin Sans" }}
                  color="primary"
                >
                  Chip Crawford
                </Typography>
                <Link href="https://www.linkedin.com/in/chip-crawford-berkeley/">
                  <LinkedInIcon className={classes.icon} />
                </Link>
                {"  "}
                <Link href="https://github.com/cwcraw">
                  <GitHubIcon className={classes.icon2} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
        {/* story */}
        <Box mt={5}>
          <Typography
            variant="h6"
            component="h1"
            align="center"
            style={{ fontFamily: "Josefin Sans" }}
          >
            <motion.div
              initial={{ y: 26 * 1.2, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1.5, delay: 0.6 }}
            >
              "Dragon Tester" was developed by Mako Kusudo, Shuntaro Maekawa,
              Zowie Min, Tam Nugyen and Chip Crawford during their time at Code
              Chrysalis Coding Boot Camp in Tokyo, Japan. We were inspired by
              Zowie's experience as a recruiter to try to improve the experience
              for both the companies looking for talent and the talent
              themselves. Our goal was to allow jobseekers to lead with their
              skills and connect them with small to medium sized companies that
              may have been overlooked.
              <br />
              Our focus was on creating a stable platform and refining the
              skills we learned at Code Chrysalis. Mako was in charge of using
              Docker and deploying the app to AWS, she also supported test
              development. Zowie was in charge of Database management and worked
              on user authentication with Tam. Tam helped on the backend, login
              and test development. Shuntaro created the test editor and was our
              frontend guru. Finally, Chip was the tech lead. He helped the team
              meet deadlines, performed QA tasks and wrote small features as
              needed.
              <br />
              We hope our app can inspire your future projects and lead to a
              better way for people to showcase their talents!
            </motion.div>
          </Typography>
        </Box>
      </Container>
      <BottomNavigation
        style={{ backgroundColor: "#121212" }}
      ></BottomNavigation>
    </>
  );
}
