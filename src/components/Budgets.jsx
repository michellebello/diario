import React from "react";
import TopBar from "./reusables/TopBar";
import SideBar from "./reusables/SideBar";
import "./styles/cuentaview.css";

function Budgets() {
  return (
    <div className="budgets">
      <TopBar></TopBar>
      <SideBar></SideBar>
      <p>My budgets:</p>
    </div>
  );
}

export default Budgets;
