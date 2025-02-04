import React from "react";
import TopBar from "./reusables/TopBar";
import SideBar from "./reusables/SideBar";
import "./styles/cuentaview.css";

function Accounts() {
  return (
    <div className="accounts">
      <TopBar></TopBar>
      <SideBar></SideBar>
    </div>
  );
}

export default Accounts;
