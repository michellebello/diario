import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getTokenHeader,
  clearToken,
} from "/Users/michelle/code/diario/src/contexts/Session.js";
import { initialState, useAppContext } from "../../contexts/context";
import Network from "../../utils/network";
import logoView from "../pictures/logoView.png";
import user from "../pictures/user.png";
import "../styles/cuentaview.css";

function TopBar({ onLogoClick }) {
  const TOPBAR_LINKS = [
    {
      path: "/mycuenta/transactions/table",
      label: "Transactions",
    },
    {
      path: "/mycuenta/accounts",
      label: "Accounts",
    },
    {
      path: "/mycuenta/budgets",
      label: "Budgets",
    },
    {
      path: "/mycuenta/taxreport",
      label: "Tax Report",
    },
  ];

  const { _, setUserInfo } = useAppContext();

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const showUserForm = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = async () => {
    const network = new Network();
    const currSession = getTokenHeader();
    try {
      await network.post("/auth/logout", currSession);
    } catch (err) {
      console.log("Err " + err);
    }

    clearToken();
    sessionStorage.removeItem("userInfo");
    setUserInfo(initialState);
    navigate("/");
  };

  return (
    <div className="totalTopBar">
      <img
        src={logoView}
        className="cuentaLogo"
        alt="logoView"
        onClick={onLogoClick}
      />

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
      <div className="user-button-div" onClick={showUserForm}>
        <img src={user} className="user" alt="user" />
        {isVisible && (
          <div className="userTab">
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
