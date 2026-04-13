import LabelInputForm from "./reusables/forms/LabelInputForm";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ErrorMessage } from "./reusables/cards/ErrorMessage";
import Network from "../utils/network";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const network = new Network();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisibility, setMessageVisibility] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !token || !newPassword || !confirmNewPassword) {
      setErrorMessage("Please complete all fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Password do not match");
      return;
    }
    try {
      const response = await network.post("/auth/new-password", {
        email: email,
        token: token,
        newPassword: newPassword,
      });
      if (response.data === "Password updated") {
        setMessageVisibility(true);
      }
    } catch (err) {
      setErrorMessage("Invalid token");
    }
  };

  return (
    <div className="totalMainPage">
      <div className="mainPage">
        <div className="main-page-body">
          <div className="main-page-form-container">
            {messageVisibility && (
              <div className="email-sent-total">
                <div className="email-sent-container">
                  <p className="email-sent-message">
                    Your password has been successfully changed.
                  </p>
                  <button
                    className="email-sent-button"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Go to Login Page
                  </button>
                </div>
              </div>
            )}
            <form
              name="reset-password"
              className="entries"
              onSubmit={resetPassword}
            >
              <div className="forgot-password-top">
                <button
                  type="button"
                  className="forgot-password-back-button"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size="clamp(0.5rem, 1vw, 0.95rem)"></ArrowLeft>
                </button>
                <p className="forgot-password-back-text">Back to Login</p>
              </div>
              <p className="forgot-password-title">Reset Password</p>
              <p className="forgot-password-text">
                Enter the following to reset your password
              </p>
              <LabelInputForm
                inputType="input"
                label="Reset Token"
                name="token"
                type="text"
                value={token}
                autocomplete="token"
                onChange={(e) => {
                  setToken(e.target.value);
                }}
              ></LabelInputForm>
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

              <LabelInputForm
                inputType="input"
                label="New Password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={newPassword}
                autocomplete="*******"
                onChange={(e) => {
                  setNewPassword(e.target.value);
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
              <LabelInputForm
                inputType="input"
                label="Confirm New Password"
                name="confirm-password"
                type={passwordVisible ? "text" : "password"}
                value={confirmNewPassword}
                autocomplete="*******"
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
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
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <button
                name="reset-password"
                className="loginButton"
                type="submit"
              >
                Reset My Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdatePassword;
