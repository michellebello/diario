import React from "react";
import { NavLink } from "react-router-dom";
import logoView from "../pictures/logoView.png";
import user from "../pictures/user.png";
import "../styles/cuentaview.css";

function TopBar() {
  const TOPBAR_LINKS = [
    {
      path: "/mycuenta/budgets",
      label: "Budgets",
    },
    {
      path: "/mycuenta/transactions",
      label: "Transactions",
    },
    {
      path: "/mycuenta/accounts",
      label: "Accounts",
    },
  ];

  return (
    <div className="totalTopBar">
      <img src={logoView} className="cuentaLogo" alt="logoView" />
      <div className="barTags">
        <li>
          <ul>
            {TOPBAR_LINKS.map((link) => {
              return (
                <NavLink className="topbarLinks" to={link.path}>
                  {link.label}
                </NavLink>
              );
            })}
          </ul>
        </li>
      </div>
      <img src={user} className="user" alt="user"></img>
    </div>
  );
}

export default TopBar;
