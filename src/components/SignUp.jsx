import { useState } from "react";
import LabelInputForm from "./reusables/forms/LabelInputForm.jsx";
import Network from "../utils/network.js";
import { EyeOff, Eye } from "lucide-react";
import { ErrorMessage } from "./reusables/cards/ErrorMessage.jsx";
import "./styles/signUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisibility, setMessageVisibility] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !confirmPassword ||
      !email
    ) {
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
        email: email,
      },
      credentials: {
        username: username,
        password: password,
      },
    };

    try {
      const network = new Network();
      await network.post("/auth/register", registerData);
      setMessageVisibility(true);
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
    <form className="entries" onSubmit={handleSubmit}>
      {messageVisibility && (
        <div className="email-sent-total">
          <div className="email-sent-container">
            <p className="email-sent-message">
              You have been registered. Now, log in with your credentials to
              start managing your finances!
            </p>
            <button
              className="email-sent-button"
              type="button"
              onClick={() => setMessageVisibility(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="entries-name">
        <LabelInputForm
          label="First Name"
          name="firstName"
          type="text"
          value={firstName}
          autocomplete="Jane"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <LabelInputForm
          label="Last Name"
          name="lastName"
          type="text"
          value={lastName}
          autocomplete="Doe"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <LabelInputForm
        label="Username"
        name="username"
        type="text"
        value={username}
        autocomplete="janedoe"
        onChange={(e) => setUsername(e.target.value)}
      />
      <LabelInputForm
        label="Email"
        name="email"
        type="text"
        value={email}
        autocomplete="janedoe@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <LabelInputForm
        label="Password"
        name="password"
        type={passwordVisible ? "text" : "password"}
        value={password}
        autocomplete="********"
        onChange={(e) => setPassword(e.target.value)}
      >
        {passwordVisible ? (
          <Eye
            size="1.25rem"
            color="#717182"
            strokeWidth={1.5}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        ) : (
          <EyeOff
            size="1.25rem"
            color="#717182"
            strokeWidth={1.5}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        )}
      </LabelInputForm>
      <LabelInputForm
        label="Confirm Password"
        name="confirmPassword"
        type={confirmPasswordVisible ? "text" : "password"}
        value={confirmPassword}
        autocomplete="********"
        onChange={(e) => setConfirmPassword(e.target.value)}
      >
        {" "}
        {confirmPasswordVisible ? (
          <Eye
            size="1.25rem"
            color="#717182"
            strokeWidth={1.5}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        ) : (
          <EyeOff
            size="1.25rem"
            color="#717182"
            strokeWidth={1.5}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        )}
      </LabelInputForm>

      {errorMessage && <ErrorMessage message={errorMessage} />}
      <button className="loginButton" type="submit">
        Register
      </button>
    </form>
  );
}

export default SignUp;
