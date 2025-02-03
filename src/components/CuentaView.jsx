import React from "react";
import SideBar from "./reusables/SideBar.jsx";
import TopBar from "./reusables/TopBar.jsx";
import "./styles/cuentaview.css";

function CuentaView() {
  return (
    <div className="cuentaView">
      <TopBar></TopBar>
      <SideBar></SideBar>
    </div>
  );
}

export default CuentaView;
