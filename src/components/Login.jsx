import React, { useState } from "react";
import { Link } from "react-router-dom";
import Network from "../utils/network.js";
import eye from "./pictures/eye.png";
import logo from "./pictures/logo.png";
import LabelInputForm from "./reusables/LabelInputForm";
import "./styles/signUp.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  };

  const handleSubmit = async () => {
    const credentials = {
      username: username,
      password: password,
    };

    if (!username || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const network = new Network();
      await network.post("/auth/login", credentials);
      setSuccessMessage("Logged in successfully");
    } catch (error) {
      console.error("Error object:", error);
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(error.response.data?.message || "Registration failed");
      } else {
        console.error("Network error or no response received");
        setErrorMessage("An error occurred, please try again");
      }
    }
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button className="loginButton" onClick={handleSubmit}>
          Login
        </button>
        <div className="loginDiv">
          <p className="underText1">Don't have an account?</p>
          <Link className="underText2" to="/signup">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
