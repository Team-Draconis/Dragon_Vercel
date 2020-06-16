import { Card, Button } from "semantic-ui-react";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import NavBar from "../src/NavBar";
import Router from "next/router";

const Dashboard = () => {
  let temp;
  let city;
  let tempResults;
  const [newResults, setNewResults] = useState();
  const [view, setView] = useState(true);
  const [candidates_Info, setCandidate_Info] = useState();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch("http://localhost:3000/api/candidatesInfo", {
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

  if (candidates_Info) {
    if (view) {
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
                        <Link href={`/comp/report/${info._id}`}>
                          <Button primary>View Test Detail</Button>
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
                          <Button primary>View Code</Button>
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
  } else {
    return <div></div>;
  }
};

export default Dashboard;
