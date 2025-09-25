import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function SideBar({ openForm, activeLabel, setActiveLabel }) {
  const ADD_ITEMS = ["Expense", "Deposit", "Transfer"];

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

  return (
    <div className="totalSideBar">
      <div className="addItem">
        <p className="sideTitle">Add a new item</p>

        {ADD_ITEMS.map((item) => {
          console.log("rendering item:", item, "activeLabel:", activeLabel);

          return (
            <button
              key={item}
              className={
                "sideBarButtons" + (activeLabel === item ? " active" : "")
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveLabel(item);
                openForm(item);
              }}
            >
              {item}
            </button>
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
    </div>
  );
}

export default SideBar;
