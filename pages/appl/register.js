import NavBar from "../NavBar";
import React, { useState } from "react";
import Router from "next/router";

export default function Register() {
  const [email, setEmail] = useState("your email");
  const [city, setCity] = useState("your city");
  const [name, setName] = useState("your name");
  const [password, setPassword] = useState("your password");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email, name, city, password);
    fetch("/api/candidateSignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_name: name,
        candidate_city: city,
        candidate_password: password,
      }),
    })
      .then((res) => {
        // Do a fast client-side transition to the already prefetched dashboard page
        if (res.ok) Router.push("/appl/end");
      })
      .catch((error) => {
        console.log(error); // add more detail error later
      });
  };

  return (
    <div>
      <NavBar />
      <h3>Applicant Register page</h3>
      <h4>New Applicant's will register here</h4>
      {/* <form action="/appl/info"> */}
      <form>
        Name:{" "}
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />{" "}
        <br />
        City:{" "}
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />{" "}
        <br />
        Email:{" "}
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />{" "}
        <br />
        Password:{" "}
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />{" "}
        <br />
        <input onClick={handleRegister} type="submit" />
      </form>

      <a href="/" className="card">
        <h3>return to login</h3>
      </a>
    </div>
  );
}
