import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./reusables/SideBar";
import TopBar from "./reusables/TopBar";
import "./styles/layout.css";

function Layout() {
  return (
    <div className="layout">
      <TopBar />
      <div className="content-container">
        <SideBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
