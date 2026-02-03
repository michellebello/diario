import { useState } from "react";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import logo from "../components/pictures/logo.png";
import "./styles/mainPage.css";

function MainPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="totalMainPage">
      <div className="mainPage">
        <div className="main-page-top">
          <img src={logo} alt="'logo" className="main-page-logo" />
          <p className="mptitle">Cuenta</p>
          <p className="text">Finance management for everyone</p>
        </div>

        <div className="main-page-body">
          <div className="main-page-switch-buttons-container">
            {/* form switcher buttons */}
            <button
              type="button"
              className={`main-page-switch-buttons ${
                isLogin
                  ? "main-page-switch-buttons--active"
                  : "main-page-switch-buttons--inactive"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={`main-page-switch-buttons ${
                !isLogin
                  ? "main-page-switch-buttons--active"
                  : "main-page-switch-buttons--inactive"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <div className="main-page-form-container">
            {isLogin ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
