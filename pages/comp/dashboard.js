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

const Dashboard = () => {
  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

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
          <Box align="center" m={5}>
            <h1>Coding Test Report</h1>
            <input type="text" onChange={onCityChange} value={temp} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
          </Box>
          {/* <div id="list">
            {candidates_Info.map((info) => {
              return (
                <div key={info._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/comp/report/${info._id}`}>
                          <Button primary>View Test Detail</Button>
                        </Link>
                        <p>From {info.candidate_city}</p>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <p>From {info.city}</p>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/comp/report/${info._id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          align="center"
                        >
                          View Test Detail
                        </Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </div> */}
          {/* </div> */}
          <div>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell align="right">View Test Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates_Info.map((info) => (
                  <TableRow key={info._id}>
                    <TableCell></TableCell>
                    <TableCell>{info.candidate_email}</TableCell>
                    <TableCell>{info.candidate_city + "  "}</TableCell>
                    <TableCell>{info.quiz_tests.length!==0 ? info.quiz_tests[info.quiz_tests.length-1].quiz_score + "%" : "NA"}</TableCell>
                    <TableCell align="right">
                      <Link href={`/comp/report/${info._id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          align="center"
                        >
                          View Test Detail
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
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <Box align="center" m={5}>
            <h1>Coding Test Report</h1>
            <input type="text" onChange={onCityChange} value={temp} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
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
                  <TableCell align="right">View Test Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newResults.map((testResult) => (
                  <TableRow key={testResult._id}>
                    <TableCell></TableCell>
                    <TableCell>{testResult.candidate_email}</TableCell>
                    <TableCell>{testResult.candidate_city}</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <Link href={`/comp/report/${testResult._id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          align="center"
                        >
                          View Test Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Dashboard;
