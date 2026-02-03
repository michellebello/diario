import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../contexts/Session.js";
import Network from "../utils/network.js";
import { useAppContext } from "../contexts/context.jsx";
import { useUserData } from "../data/user/fetchAndSaveUserData.js";
import { EyeOff, Eye } from "lucide-react";
import LabelInputForm from "./reusables/LabelInputForm";
import "./styles/signUp.css";

function Login() {
  const { _, setUserInfo } = useAppContext();
  const fetchUserData = useUserData();

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

      setToken(token);

      setUserInfo((prev) => ({
        ...prev,
        username,
        isLoggedIn: true,
      }));

      await fetchUserData();
      navigator("/mycuenta/transactions/table");
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
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button className="loginButton" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
