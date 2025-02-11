import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";

import Transactions from "./components/Transactions.jsx";
import Accounts from "./components/Accounts.jsx";
import Budgets from "./components/Budgets.jsx";
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
      path: "/mycuenta/transactions/table",
      element: <Table />,
    },
    {
      path: "/mycuenta/transactions/barchart",
      element: <Barchart />,
    },
    {
      path: "/mycuenta/transactions/donutchart",
      element: <DonutChart />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
