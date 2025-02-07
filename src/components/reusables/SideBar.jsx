import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
          <div className="entry">
            <label className="entryLabel">Name</label>
            <input
              className="entryInput"
              type="text"
              placeholder="Ex. Shake Shack"
            />
          </div>
          <div className="entry">
            <label className="entryLabel">Spending account</label>
            <input
              className="entryInput"
              type="text"
              placeholder="Chase XXXXXXX1234"
            />
          </div>
          <div className="entry">
            <label className="entryLabel">Date</label>
            <input
              className="entryInput"
              type="date"
              placeholder="12/06/2019"
            />
          </div>
          <div className="entry">
            <label className="entryLabel">Category</label>
            <input className="entryInput" type="text" placeholder="Eat Out" />
          </div>
          <div className="entry">
            <label className="entryLabel">Amount</label>
            <input
              className="entryInput"
              type="number"
              min="0"
              step="0.01"
              placeholder="$12.34"
            />
          </div>
          <div className="buttons">
            <button className="addButton">Add</button>
            <button className="cancelButton">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SideBar;
