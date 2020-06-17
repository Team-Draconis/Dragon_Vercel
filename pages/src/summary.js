// Save this code and use it on info.js

import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";
import Link from "next/link";
import { useState } from "react";

const Dashboard = ({ testResults }) => {
  let temp;
  let email;
  let tempResults;
  const [newResults, setNewResults] = useState([{}]);
  const [view, setView] = useState(true);

  const onEmailChange = ({ target: { value } }) => {
    email = value;
  };

  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/candidate_email/${email}`
    );
    const { data } = await res.json();
    tempResults = data;
    setNewResults(tempResults);
    setView(false);
  };
  const handleReset = () => {
    setView(true);
  };
  if (view) {
    return (
      <div>
        <input type="text" onChange={onEmailChange} value={temp} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  } else {
    return (
      <div>
        <input type="text" onChange={onEmailChange} value={temp} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>

        <h1>Coding Test Report</h1>
        <div>
          {newResults.map((testResult) => {
            return (
              <div key={testResult._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <p>Results sent to: {testResult.city}</p>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/test/${testResult._id}`}>
                      <Button primary>View Code</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Dashboard;
