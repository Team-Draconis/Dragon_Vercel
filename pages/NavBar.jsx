import "./styles/navbar.scss";
import { loggedUser } from "./appl/login";
import React, { useEffect, useState, useRef } from "react";
import SocialButton from "./social-login/SocialButton";

export default function NavBar() {
  const [loggedUser, loginUser] = useState("Logged Out");
  const handleSocialLogin = (user) => {
    console.log(user.profile, "HERE IS THE USER!!!!!!!!!!!!!");
    
    loginUser(user.profile);
  };
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <div className="navbar">
      <h2 id="title">Dragon Tester: Show your fire!</h2>
      <a href="/" className="navcard">
        <h3>LogOut</h3> <br />
      </a>
      <div>
        <div>
          <h3>Login page</h3>
          <SocialButton
            provider="github"
            gatekeeper="http://localhost:9999"
            appId="92ee8233527f289507b9"
            redirect="http://localhost:3000/appl/splash"
            scope="user"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Login with Github Auth
          </SocialButton>
        </div>
      </div>
  <div>{loggedUser.name}</div>
      <a href="/comp/login" className="navcard">
        <h3>Company logIn</h3>
      </a>
    </div>
  );
}
