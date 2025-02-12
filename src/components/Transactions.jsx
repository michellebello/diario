import React from "react";
import "./styles/transactions.css";

function Transactions() {
  return (
    <div className="transactions">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>
        <div className="fromTo">
          <p className="from">FROM</p>
          <p className="to">TO</p>
        </div>
      </div>
    </div>
  );
}
export default Transactions;
