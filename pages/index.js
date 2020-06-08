import React, { Component } from "react";
// import "./index.css";
// import Sandbox from "./Sandbox";
// import Link from "next/link";
// import Sandbox from "./appl/Sandbox";
import GithubLogin from "./appl/login";
import NavBar from "./NavBar";

class Index extends Component {
  state = {};
  render() {
    const handleSubmit = (e) => {
      console.log(e);
    };
    return (
      <div>
        <NavBar />
        <h3>Applicant Login page</h3>
        <h4>Welcome to Dragon Tester where you can display your skills. At Dragon Tester you can anonomously take a react coding test and have it be reviewed by leading companies around the globe. Based on the location you choose, local companies will review your results and reach out to you if they are interested.</h4>
        <h4>We bypass recruiters and algorithms which may introduce unconscious bias and allow your skill to open doors. We retain only your email address and location preference. Feel free to take the tests multiple times and look for jobs across the globe.</h4>        
 
        {/* <form action="/appl/info"> */}
        {/* <form>
          Name: <input type="text" name="fname" /> <br />
          Email: <input type="text" name="femail" /> <br />
          <input onClick={handleSubmit} type="submit" />
        </form> */}
        <GithubLogin />
        <a href="/appl/splash" className="card">
          <h3>Go to the splash page</h3>
        </a>
        <a href="/appl/register" className="card">
          <h3>Register</h3>
        </a>
      </div>
    );
  }
}

export default Index;
