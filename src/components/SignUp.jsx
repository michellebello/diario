import React, { useState } from "react";
import { Link } from "react-router-dom";
import LabelInputForm from "./reusables/LabelInputForm";
import Network from "../utils/network";
import logo from "./pictures/logo.png";
import eye from "./pictures/eye.png";
import "./styles/signUp.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const registerData = {
      userInfo: {
        firstName: firstName,
        lastName: lastName,
      },
      credentials: {
        username: username,
        password: password,
      },
    };

    try {
      const network = new Network();
      await network.post("/auth/register", registerData);
      setSuccessMessage("Registration sucessful");
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
    <div className="totalPage">
      <div className="signUpForm">
        <img className="logo" src={logo} alt="logo" />
        <div className="entries">
          <LabelInputForm
            label="First Name"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <LabelInputForm
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <LabelInputForm
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
              onClick={togglePasswordVisibility}
            />
          </LabelInputForm>
          <LabelInputForm
            label="Confirm Password"
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            <img
              className="eye"
              src={eye}
              alt="eye"
              onClick={toggleConfirmPasswordVisibility}
            />
          </LabelInputForm>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button className="signUpButton" onClick={handleSubmit}>
          Register
        </button>
        <div className="loginDiv">
          <p className="underText1">Already registered?</p>
          <Link className="underText2" to="/login">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
