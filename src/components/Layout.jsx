import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useUserData } from "../data/user/fetchAndSaveUserData";
import FormComponent from "./reusables/FormComponent";
import SideBar from "./reusables/SideBar";
import TopBar from "./reusables/TopBar";
import "./styles/layout.css";

function Layout() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [formLabel, setFormLabel] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);
  const fetchUserData = useUserData();

  const [sideBarVisible, setSideBarVisible] = useState(false);
  const showSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

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

  const handleAddTransaction = async () => {
    await fetchUserData();
    closeForm();
  };

  return (
    <div className="layout">
      <TopBar onLogoClick={showSideBar} />
      <div className="content-container">
        <SideBar
          open={sideBarVisible}
          openForm={openForm}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
        />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      {formVisibility && (
        <div className="addItemForm-container">
          <FormComponent
            formLabel={formLabel}
            onCancel={closeForm}
            onTransactionAdded={handleAddTransaction}
          />
        </div>
      )}
    </div>
  );
}

export default Layout;
