import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../contexts/Session.js";
import Network from "../utils/network.js";
import { useAppContext } from "../contexts/context.jsx";
import { useUserData } from "../data/user/fetchAndSaveUserData.js";
import { EyeOff, Eye } from "lucide-react";
import LabelInputForm from "./reusables/forms/LabelInputForm.jsx";
import { ErrorMessage } from "./reusables/cards/ErrorMessage.jsx";
import { ArrowLeft } from "lucide-react";
import "./styles/signUp.css";

function Login() {
  const { _, setUserInfo } = useAppContext();
  const fetchUserData = useUserData();
  const network = new Network();

  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  };

  const [forgotPasswordFormVisibility, setForgotPasswordFormVisibility] =
    useState(false);

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
      const result = await network.post("/auth/login", credentials, false);
      const token = result.data;

      setToken(token);

      setUserInfo((prev) => ({
        ...prev,
        username,
        isLoggedIn: true,
      }));

      await fetchUserData();
      navigator("/mycuenta/accounts/");
    } catch (error) {
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

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please specify your email");
    }
    try {
      const response = await network.post("/auth/forgot-password", {
        email: email,
      });
      console.log(JSON.stringify(response));
      if (response.data === "Token sent") {
        setEmailMessageVisibility(true);
        console.log("Sucess");
      }
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const [emailMessageVisibility, setEmailMessageVisibility] = useState(false);

  return (
    <>
      {forgotPasswordFormVisibility ? (
        <form name="forgot-password" className="entries" onSubmit={sendEmail}>
          {emailMessageVisibility && (
            <div className="email-sent-total">
              <div className="email-sent-container">
                <p className="email-sent-message">
                  Token sent. Check your inbox and follow instructions on how to
                  reset your password.
                </p>
                <button
                  className="email-sent-button"
                  type="button"
                  onClick={() => setEmailMessageVisibility((prev) => !prev)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="forgot-password-top">
            <button
              type="button"
              className="forgot-password-back-button"
              onClick={() => setForgotPasswordFormVisibility(false)}
            >
              <ArrowLeft size="clamp(0.5rem, 1vw, 0.95rem)"></ArrowLeft>
            </button>
            <p className="forgot-password-back-text">Back to Login</p>
          </div>
          <p className="forgot-password-title">Forgot Password?</p>
          <p className="forgot-password-text">
            Enter the email associated with your account to receive a token that
            will let you reset your password
          </p>
          <LabelInputForm
            inputType="input"
            label="Email"
            name="email"
            type="text"
            value={email}
            autocomplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></LabelInputForm>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <button name="forgot-password" className="loginButton" type="submit">
            Send me a token
          </button>
        </form>
      ) : (
        <form name="login" className="entries" onSubmit={handleSubmit}>
          <LabelInputForm
            inputType="input"
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
            inputType="input"
            label="Password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            autocomplete="*******"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          >
            {passwordVisible ? (
              <Eye
                size="1.25rem"
                color="#717182"
                strokeWidth={1.5}
                onClick={toggleVisibility}
              />
            ) : (
              <EyeOff
                size="1.25rem"
                color="#717182"
                strokeWidth={1.5}
                onClick={toggleVisibility}
              />
            )}
          </LabelInputForm>
          <p
            className="forgot-password-link"
            onClick={() => setForgotPasswordFormVisibility(true)}
          >
            Forgot password?
          </p>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {successMessage && <p className="success">{successMessage}</p>}
          <button name="login" className="loginButton" type="submit">
            Login
          </button>
        </form>
      )}
    </>
  );
}

export default Login;
