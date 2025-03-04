import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const [formLabel, setFormLabel] = useState("");
  const [formVisibility, setFormVisibility] = useState(false);

  const handleClick = (label) => {
    setFormLabel(label);
    setFormVisibility(true);
  };

  const handleTransactionAdded = () => {
    setFormVisibility(false);
  };

  const handleCancel = () => {
    setFormVisibility(false);
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
                handleClick(item.label);
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div className="viewMode">
        <p className="sideTitle">View mode</p>
        {VIEW_ITEMS.map((link) => {
          return (
            <NavLink className="sideBarLinks" to={link.path} key={link.label}>
              {link.label}
            </NavLink>
          );
        })}
      </div>
      {formVisibility && (
        <FormComponent
          formLabel={formLabel}
          onCancel={handleCancel}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
    </div>
  );
}

export default SideBar;
