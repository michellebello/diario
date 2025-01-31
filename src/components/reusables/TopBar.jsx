import React from "react";
import logoView from "../pictures/logoView.png";

function TopBar() {
  return (
    <div>
      <img src={logoView} alt="logoView" />
      <div>
        <p>Budgets</p>
        <p>Transacation</p>
        <p>Accounts</p>
      </div>
    </div>
  );
}

export default TopBar;
