import React, { Component } from "react";
import { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import Router from "next/router";

function Index() {
  const [email, setEmail] = useState("your email");
  const [password, setPassword] = useState("your password");
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/candidateLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_password: password,
      }),
    })
      .then((res) => {
        console.log(res.status);
        // Do a fast client-side transition to the already prefetched dashboard page
        if (res.status === 200) {
          Router.push("/appl/end");
        }
      })
      .catch((error) => {
        console.log(error); // add more detail error later
      });
  };

  return (
    <div>
      <NavBar />
      <h3>Applicant Login page</h3>
      <h4>
        Welcome to Dragon Tester where you can display your skills. At Dragon
        Tester you can anonomously take a react coding test and have it be
        reviewed by leading companies around the globe. Based on the location
        you choose, local companies will review your results and reach out to
        you if they are interested.
      </h4>
      <h4>
        We bypass recruiters and algorithms which may introduce unconscious bias
        and allow your skill to open doors. We retain only your email address
        and location preference. Feel free to take the tests multiple times and
        look for jobs across the globe.
      </h4>

      <form>
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
        <input onClick={handleLogin} type="submit" value="Login" />
      </form>

      <a href="/appl/splash" className="card">
        <h3>Go to the splash page</h3>
      </a>
      <h2>
        Don't have an account? Register from{" "}
        <a href="/appl/register" className="card">
          here
        </a>
      </h2>
    </div>
  );
}

export default Index;
