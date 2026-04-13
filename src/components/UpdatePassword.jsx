import LabelInputForm from "./reusables/forms/LabelInputForm";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "./reusables/cards/ErrorMessage";

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const resetPassword = async () => {
    if (!email || !token || !newPassword || !confirmNewPassword) {
      setErrorMessage("Please complete all fields");
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Password do not match");
    }
  };
  return (
    <div className="totalMainPage">
      <div className="mainPage">
        <div className="main-page-body">
          <div className="main-page-form-container">
            <form className="entries" onSubmit={resetPassword}>
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
                name="password"
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
              <button className="loginButton" type="submit">
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
