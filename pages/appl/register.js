// Shuntaro will update this page with meterial UI
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
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_email: email,
        candidate_name: name,
        candidate_city: city,
        candidate_password: password,
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          console.log("$$$", res.id);
          Router.push(`/appl/dashboard/${res.id}`);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
    </div>
  );
}
