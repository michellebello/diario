import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function SideBar() {
  const ADD_ITEMS = [
    {
      path: "/",
      label: "Expense",
    },
    {
      path: "/",
      label: "Deposit",
    },
    {
      path: "/",
      label: "Transfer",
    },
    {
      path: "/",
      label: "Budget",
    },
  ];
  const VIEW_ITEMS = [
    {
      path: "/",
      label: "Table",
    },
    {
      path: "/",
      label: "Barchart",
    },
    {
      path: "/",
      label: "Donut chart",
    },
  ];
  return (
    <div className="totalSideBar">
      <div className="addItem">
        <p className="sideTitle">Add a new item</p>
        {ADD_ITEMS.map((item) => {
          return <NavLink to={item.path}>{item.label}</NavLink>;
        })}
      </div>
      <div className="viewMode">
        <p className="sideTitle">View mode</p>
        {VIEW_ITEMS.map((item) => {
          return <NavLink to={item.path}>{item.label}</NavLink>;
        })}
      </div>
    </div>
  );
}

export default SideBar;
