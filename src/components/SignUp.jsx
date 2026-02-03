import { useState } from "react";
import LabelInputForm from "./reusables/LabelInputForm";
import Network from "../utils/network";
import { EyeOff, Eye } from "lucide-react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <form className="entries" onSubmit={handleSubmit}>
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

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button className="signUpButton" type="submit">
        Register
      </button>

      {/* <div className="loginDiv">
        <p className="underText1">Already registered?</p>
        <Link className="underText2" to="/login">
          Login here
        </Link>
      </div> */}
    </form>
  );
}

export default SignUp;
