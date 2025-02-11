import React from "react";
import TopBar from "./reusables/TopBar";
import SideBar from "./reusables/SideBar";
import "./styles/transactions.css";

function Transactions() {
  return (
    <div className="transactions">
      <TopBar></TopBar>
      <SideBar></SideBar>
      <h1>Transactions</h1>
    </div>
  );
}

export default Transactions;
