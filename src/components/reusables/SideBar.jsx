import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent.jsx";
import "../styles/sidebar.css";

function SideBar() {
  const ADD_ITEMS = [
    {
      path: "/mycuenta/transactions/",
      label: "Expense",
    },
    {
      path: "/mycuenta/transactions/",
      label: "Deposit",
    },
    {
      path: "/mycuenta/transactions/",
      label: "Transfer",
    },
  ];
  const VIEW_ITEMS = [
    {
      path: "/mycuenta/transactions/table",
      label: "Table",
    },
    {
      path: "/mycuenta/transactions/barchart",
      label: "Barchart",
    },
    {
      path: "/mycuenta/transactions/donutchart",
      label: "Donut chart",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [formLabel, setFormLabel] = useState("");

  const showForm = location.pathname === "/mycuenta/transactions/";

  const handleClick = (label, path) => {
    setFormLabel(label);
    navigate(path);
  };

  return (
    <div className="totalSideBar">
      <div className="addItem">
        <p className="sideTitle">Add a new item</p>
        {ADD_ITEMS.map((item) => {
          return (
            <NavLink
              className="sideBarLinks"
              to={item.path}
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.label, item.path);
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div className="viewMode">
        <p className="sideTitle">View mode</p>
        {VIEW_ITEMS.map((item) => {
          return (
            <NavLink className="sideBarLinks" to={item.path} key={item.label}>
              {item.label}
            </NavLink>
          );
        })}
      </div>
      {showForm && <FormComponent formLabel={formLabel} />}
    </div>
  );
}

export default SideBar;
