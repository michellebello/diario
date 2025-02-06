import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function SideBar() {
  const ADD_ITEMS = [
    {
      path: "/mycuenta/additem",
      label: "Expense",
    },
    {
      path: "/mycuenta/additem",
      label: "Deposit",
    },
    {
      path: "/mycuenta/additem",
      label: "Transfer",
    },
    {
      path: "/mycuenta/additem",
      label: "Budget",
    },
  ];
  const VIEW_ITEMS = [
    {
      path: "/mycuenta/barchart",
      label: "Barchart",
    },
    {
      path: "/mycuenta/donutchart",
      label: "Donut chart",
    },
  ];
  return (
    <div className="totalSideBar">
      <div className="addItem">
        <p className="sideTitle">Add a new item</p>
        {ADD_ITEMS.map((item) => {
          return (
            <NavLink className="sideBarLinks" to={item.path}>
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div className="viewMode">
        <p className="sideTitle">View mode</p>
        {VIEW_ITEMS.map((item) => {
          return (
            <NavLink className="sideBarLinks" to={item.path}>
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
