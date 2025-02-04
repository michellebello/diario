import React from "react";
import TopBar from "./reusables/TopBar";
import SideBar from "./reusables/SideBar";
import "./styles/cuentaview.css";

function Transactions() {
  return (
    <div className="transactions">
      <TopBar></TopBar>
      <SideBar></SideBar>
    </div>
  );
}

export default Transactions;
