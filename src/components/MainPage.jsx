import React from "react";
import main from "./pictures/main.svg";
import Buttons from "./reusables/Buttons.jsx";
import "./styles/mainPage.css";

function MainPage() {
  return (
    <div className="mainPage">
      <p className="title">Contador</p>
      <p className="text">Finance management for everyone</p>
      <div className="buttons">
        <Buttons linkTo="/login">Login</Buttons>
        <Buttons linkTo="/signup">Sign up</Buttons>
      </div>
      <img className="pic" src={main} alt="main" />
    </div>
  );
}

export default MainPage;
