import React from "react";
import logoView from "../pictures/logoView.png";

function TopBar() {
  return (
    <div className="totalTopBar">
      <img src={logoView} className="cuentaLogo" alt="logoView" />
      <div className="barTags">
        <p className="barTag">Budgets</p>
        <p className="barTag">Transaction</p>
        <p className="barTag">Accounts</p>
      </div>
    </div>
  );
}

export default TopBar;
