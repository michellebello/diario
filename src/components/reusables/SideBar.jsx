import React from "react";
import "../styles/cuentaview.css";

function SideBar() {
  return (
    <div className="totalSideBar">
      <div className="addItem">
        <p className="sideTitle">Add a new item</p>
        <p className="item">Expense</p>
        <p className="item">Deposit</p>
        <p className="item">Transfer</p>
        <p className="item">Budget</p>
      </div>
      <div className="viewMode">
        <p className="sideTitle">View Mode</p>
        <p className="item">Table</p>
        <p className="item">Barchart</p>
        <p className="item">Donut chart</p>
      </div>
    </div>
  );
}

export default SideBar;
