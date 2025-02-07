import React from "react";
import TopBar from "./reusables/TopBar";
import SideBar from "./reusables/SideBar";
import "./styles/table.css";

function Table() {
  return (
    <div className="totalTableView">
      <TopBar />
      <SideBar />
      <div className="tableView">
        <p className="tableTitle">Tracked Expenses</p>
      </div>
    </div>
  );
}

export default Table;
