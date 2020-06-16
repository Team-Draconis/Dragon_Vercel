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

const Dashboard = ({ candidates_Info }) => {
  let temp;
  let city;
  let tempResults;
  const [newResults, setNewResults] = useState(candidates_Info);
  const [view, setView] = useState(true);

  const onCityChange = ({ target: { value } }) => {
    console.log(value);
    city = value;
  };

  let flag = false;
  const handleSubmit = () => {
    tempResults = candidates_Info.filter((el) => {
      flag = false;
      console.log(el);
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
  if (candidates_Info && view) {
    return (
      <>
        <NavBar />
        <div style={{ marginLeft: "50px", marginTop: "30px" }}>
          <input type="text" onChange={onCityChange} value={temp} />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset}>Reset</button>
          <h1>Coding Test Report</h1>
          <div id="list">
            {candidates_Info.map((info) => {
              return (
                <div key={info._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/comp/report/${info._id}`}>
                          <a>{info.candidate_email}</a>
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
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <NavBar />
        <div style={{ marginLeft: "50px", marginTop: "30px" }}>
          <input type="text" onChange={onCityChange} value={temp} />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset}>Reset</button>

          <h1>Coding Test Report</h1>
          <div id="list">
            {newResults.map((testResult) => {
              return (
                <div key={testResult._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/comp/report/${testResult._id}`}>
                          <a>{testResult.candidate_email}</a>
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
          </div>
        </div>
      </div>
    );
  }
};

Dashboard.getInitialProps = async () => {
  try {
    const res = await fetch(
      // "http://dragontester-env-1.eba-cqpqhfiq.us-east-2.elasticbeanstalk.com/api/candidatesInfo"
      "http://localhost:3000/api/candidatesInfo"
    );
    const { data } = await res.json();
    return { candidates_Info: data };
  } catch (error) {
    return {
      candidates_Info: [
        {
          _id: "dummy1",
          candidate_name: "dummy1",
          andidate_email: "dummy1",
          candidate_city: "dummy1",
          coding_tests: "dummy1",
        },
        {
          _id: "dummy2",
          candidate_name: "dummy2",
          andidate_email: "dummy2",
          candidate_city: "dummy2",
          coding_tests: "dummy2",
        },
      ],
    };
  }
};

export default Dashboard;
