import React from "react";
import main from "./pictures/main.svg";
import Buttons from "./reusables/Buttons.jsx";
import logo from "../components/pictures/logo.png";
import "./styles/mainPage.css";

function MainPage() {
  return (
    <div className="totalMainPage">
      <div className="mainPage">
        <img src={logo} alt="'logo" className="main-page-logo" />
        <p className="mptitle">Cuenta</p>
        <p className="text">Finance management for everyone</p>
        <div className="buttons">
          <Buttons linkTo="/login">Login</Buttons>
          <Buttons linkTo="/signup">Sign up</Buttons>
        </div>
        <img className="pic" src={main} alt="main" />
      </div>
    </div>
  );
}

export default MainPage;
