import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Network from "../utils/network.js";
import eye from "./pictures/eye.png";
import logo from "./pictures/logo.png";
import LabelInputForm from "./reusables/LabelInputForm";
import "./styles/signUp.css";

function Login() {
  const navigator = useNavigate();
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
      navigator("/mycuenta/transactions");
      setSuccessMessage("Logged in successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error object:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data?.message || "Login failed";
        if (errorMessage === "Password does not match") {
          setErrorMessage("Incorrect password");
        } else if (errorMessage === "Username not found") {
          setErrorMessage("Username not found");
        } else {
          setErrorMessage(errorMessage || "Login failed");
        }
      } else {
        setErrorMessage("An error occurred, please try again");
      }
      setSuccessMessage("");
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
