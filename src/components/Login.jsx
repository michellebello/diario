import React, { useState } from "react";
import eye from "./pictures/eye.png";
import logo from "./pictures/logo.png";
import LabelInputForm from "./reusables/LabelInputForm";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  };
  return (
    <div className="signUpForm">
      <img src={logo} alt="logo"></img>
      <div className="entries">
        <LabelInputForm
          label="Username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></LabelInputForm>
        <LabelInputForm
          label="Password"
          name="password"
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <img
            className="eye"
            src={eye}
            alt="eye"
            onClick={toggleVisibility}
          ></img>
        </LabelInputForm>
        <button className="loginButton">Login</button>
      </div>
    </div>
  );
}

export default Login;
