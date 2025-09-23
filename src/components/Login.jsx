import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../contexts/Session.js";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };

    if (!username || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const network = new Network();
      const result = await network.post("/auth/login", credentials, false);
      const token = result.data;
      console.log("result from login: " + result.data);

      setToken(token);
      navigator("/mycuenta/transactions/table");
      setSuccessMessage("Logged in successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data?.message || "Login failed";

        if (errorMessage === "Password does not match") {
          setErrorMessage("Incorrect password");
        } else if (errorMessage === "Username not found") {
          setErrorMessage("Username not found");
        } else {
          setErrorMessage(errorMessage);
        }
      } else {
        setErrorMessage("An error occurred, please try again");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="totalPage">
      <div className="signUpForm">
        <img className="logo" src={logo} alt="logo"></img>
        <p className="form-title">Login</p>
        <form className="entries" onSubmit={handleSubmit}>
          <LabelInputForm
            label="Username"
            name="username"
            type="text"
            value={username}
            autocomplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></LabelInputForm>
          <LabelInputForm
            label="Password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            autocomplete="*******"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
          <button className="loginButton" type="submit">
            Login
          </button>
          <div className="loginDiv">
            <p className="underText1">Don't have an account?</p>
            <Link className="underText2" to="/signup">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
