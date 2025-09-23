import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getTokenHeader,
  clearToken,
} from "/Users/michelle/code/diario/src/contexts/Session.js";
import Network from "../../utils/network";
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
      path: "/mycuenta/transactions/table",
      label: "Transactions",
    },
    {
      path: "/mycuenta/accounts",
      label: "Accounts",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const showUserForm = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = async () => {
    const network = new Network();
    const currSession = getTokenHeader();
    await network.post("/auth/logout", currSession);
    clearToken();
    navigate("/");

    console.log("Token removed:", currSession);
  };

  return (
    <div className="totalTopBar">
      <img src={logoView} className="cuentaLogo" alt="logoView" />
      <div className="barTags">
        <li>
          <ul>
            {TOPBAR_LINKS.map((link) => {
              return (
                <NavLink
                  className="topbarLinks"
                  to={link.path}
                  key={link.label}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </ul>
        </li>
      </div>
      <a className="userButton" href={user} onClick={showUserForm}>
        <img src={user} className="user" alt="user" />
        {isVisible && (
          <div className="userTab">
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </a>
    </div>
  );
}

export default TopBar;
