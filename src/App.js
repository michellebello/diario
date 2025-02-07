import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";
import CuentaView from "./components/CuentaView.jsx";
import Transactions from "./components/Transactions.jsx";
import Budgets from "./components/Budgets.jsx";
import Accounts from "./components/Accounts.jsx";
import Table from "./components/Table.jsx";
import Barchart from "./components/Barchart.jsx";
import DonutChart from "./components/DonutChart.jsx";

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
      children: [
        { path: "budgets", element: <Budgets /> },
        { path: "accounts", element: <Accounts /> },
        {
          path: "transactions",
          element: <Transactions />,
          children: [
            { path: "table", element: <Table /> },
            { path: "barchart", element: <Barchart /> },
            { path: "donutchart", element: <DonutChart /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
