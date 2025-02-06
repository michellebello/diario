import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";
import CuentaView from "./components/CuentaView.jsx";
import Transactions from "./components/Transactions.jsx";
import Budgets from "./components/Budgets.jsx";
import Accounts from "./components/Accounts.jsx";
import Barchart from "./components/Barchart.jsx";
import DonutChart from "./components/DonutChart.jsx";
import AddItem from "./components/AddItem.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/mycuenta",
      element: <CuentaView />,
    },
    {
      path: "/mycuenta/transactions",
      element: <Transactions />,
    },
    {
      path: "/mycuenta/budgets",
      element: <Budgets />,
    },
    {
      path: "/mycuenta/accounts",
      element: <Accounts />,
    },
    {
      path: "/mycuenta/barchart",
      element: <Barchart />,
    },
    {
      path: "/mycuenta/donutchart",
      element: <DonutChart />,
    },
    {
      path: "/mycuenta/additem",
      element: <AddItem />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
