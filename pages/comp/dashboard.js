import { Card } from "semantic-ui-react";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import React, { useState } from "react";
import NavBar from "../src/NavBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Router from "next/router";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

  //Declaring styled textfield
  const CssTextField = withStyles({
    root: {
      // "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      //   borderColor: "red", //default
      // },
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
      },
    },
  })(TextField);

  let temp;
  let tempResults;
  const [city, setCity] = useState("");
  const [newResults, setNewResults] = useState();
  const [view, setView] = useState(true);
  const [candidates_Info, setCandidate_Info] = useState();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch("/api/candidatesInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        res.json().then((res) => {
          setCandidate_Info(res.data);
          setNewResults(res.data);
        });
      });
    } else {
      //if there is no token , then force the company to sign in
      Router.push("/comp/signin");
    }
  }, []);

  const onCityChange = ({ target: { value } }) => {
    setCity(value);
  };

  let flag = false;
  const handleSubmit = () => {
    tempResults = candidates_Info.filter((el) => {
      flag = false;
      for (let item of el.candidate_city) {
        if (item.toLowerCase() === city.toLowerCase()) {
          flag = true;
        }
      }
      return flag;
    });
    setNewResults(tempResults);
    setView(false);
  };

  const handleReset = () => {
    setView(true);
  };

  if (candidates_Info) {
    if (view) {
      return (
        <>
          <NavBar />
          {/* <div style={{ marginLeft: "50px", marginTop: "30px" }}> */}
          <motion.div
            initial={{ y: 26 * 1.2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.5, delay: 0.4 }}
          >
            <Box align="center" m={5}>
              <h1>Coding Test Report</h1>
              <Box display="flex" justifyContent="center">
                <Box mt={3}>
                  {/* //please dont delete this */}

                  {/* <CssTextField
                  onChange={(e) => onCityChange}
                  value={temp}
                  placeholder="Filter By City"
                  inputProps={{
                    style: { fontFamily: "nunito", color: "white" },
                  }}
                  variant="outlined"
                /> */}
                  <input
                    type="text"
                    onChange={onCityChange}
                    value={temp}
                    placeholder="Filter by city"
                  />
                </Box>
                <Box mt={2.2} ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    align="center"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
                <Box mt={2.2} ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    align="center"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
            <Grid container>
              <Grid item item xs={12} sm={12} md={12}>
                <div>
                  <Table
                    size="medium"
                    style={{
                      width: "100%",
                      tableLayout: "fixed",
                      wordBreak: "break-all",
                      wordWrap: "break-all",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Last active at:</TableCell>
                        <TableCell>Email:</TableCell>
                        <TableCell>City:</TableCell>
                        <TableCell>Score:</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {candidates_Info.map((info) => (
                        <TableRow key={info._id}>
                          <TableCell>
                            {`${info.last_login}`.slice(0, -30)}
                          </TableCell>
                          <TableCell>{info.candidate_email}</TableCell>
                          <TableCell>
                            {info.candidate_city.map((el) => {
                              if (
                                info.candidate_city.indexOf(el) <
                                info.candidate_city.length - 1
                              ) {
                                return el + ", ";
                              }
                              return el;
                            })}
                          </TableCell>
                          <TableCell>
                            {info.quiz_tests.length !== 0
                              ? info.quiz_tests[info.quiz_tests.length - 1]
                                  .quiz_score + "%"
                              : "NA"}
                          </TableCell>
                          <TableCell align="right">
                            <Link href={`/comp/report/${info._id}`}>
                              <Button
                                variant="contained"
                                color="primary"
                                align="center"
                              >
                                View Test Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div> */}
              </Grid>
            </Grid>
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <motion.div
            initial={{ y: 26 * 1.2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.5, delay: 0.4 }}
          >
            <Box align="center" m={5}>
              <h1>Coding Test Report</h1>
              <Box display="flex" justifyContent="center">
                <Box mt={3}>
                  {/* please dont delete this */}
                  {/* <CssTextField
                  onChange={onCityChange}
                  value={temp}
                  placeholder="Filter By City"
                  inputProps={{
                    style: { fontFamily: "nunito", color: "white" },
                  }}
                  variant="outlined"
                /> */}
                  <input
                    type="text"
                    onChange={onCityChange}
                    value={temp}
                    placeholder="Filter by city"
                  />
                </Box>
                <Box mt={2.2} ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    align="center"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
                <Box mt={2.2} ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    align="center"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* <div id="list">
            {newResults.map((testResult) => {
              return (
                <div key={testResult._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/comp/report/${testResult._id}`}>
                          <Button primary>View Code</Button>
                        </Link>
                        <p>From {testResult.candidate_city}</p>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/comp/report/${testResult._id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          align="center"
                        >
                          View Code
                        </Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </div> */}
            <div>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newResults.map((testResult) => (
                    <TableRow key={testResult._id}>
                      <TableCell>
                        {`${testResult.last_login}`.slice(0, -30)}
                      </TableCell>
                      <TableCell>{testResult.candidate_email}</TableCell>
                      <TableCell>
                        {testResult.candidate_city.map((el) => {
                          if (
                            testResult.candidate_city.indexOf(el) <
                            testResult.candidate_city.length - 1
                          ) {
                            return el + ", ";
                          }
                          return el;
                        })}
                      </TableCell>
                      <TableCell>
                        {testResult.quiz_tests.length !== 0
                          ? testResult.quiz_tests[
                              testResult.quiz_tests.length - 1
                            ].quiz_score + "%"
                          : "NA"}
                      </TableCell>
                      <TableCell align="right">
                        <Link href={`/comp/report/${testResult._id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            align="center"
                          >
                            View Test Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Dashboard;
