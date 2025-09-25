import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./reusables/SideBar";
import TopBar from "./reusables/TopBar";
import "./styles/layout.css";

function Layout() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [formLabel, setFormLabel] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);

  const openForm = (label) => {
    setFormVisibility(true);
    setFormLabel(label);
    setActiveLabel(label);
  };

  const closeForm = () => {
    setFormVisibility(false);
    setFormLabel("");
    setActiveLabel(null);
  };

  return (
    <div className="layout">
      <TopBar />
      <div className="content-container">
        <SideBar
          openForm={openForm}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
        />
        <main className="main-content">
          <Outlet
            context={{
              formVisibility,
              formLabel,
              closeForm,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default Layout;
