import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();
  const [formLabel, setFormLabel] = useState("");

  const showForm = location.pathname === "/mycuenta/additem";

  const handleClick = (label, path) => {
    setFormLabel(label);
    navigate(path);
  };

  return (
    <div className="addItemTotal">
      <div className="totalSideBar">
        <div className="addItem">
          <p className="sideTitle">Add a new item</p>
          {ADD_ITEMS.map((item) => {
            return (
              <NavLink
                className="sideBarLinks"
                to={item.path}
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
              <NavLink className="sideBarLinks" to={item.path}>
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {showForm && formLabel && (
        <form className="addItemForm">
          <p className="itemType">{formLabel}</p>
          <label>{formLabel}</label>
          <input type="text" placeholder={`Ex. ${formLabel}`} />
        </form>
      )}
    </div>
  );
}

export default SideBar;
