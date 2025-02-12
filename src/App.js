import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";
import Layout from "./components/Layout";

import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import Budgets from "./components/Budgets";
import Table from "./components/Table";
import Barchart from "./components/Barchart";
import DonutChart from "./components/DonutChart";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    {
      path: "/mycuenta",
      element: <Layout />,
      children: [
        { path: "transactions", element: <Transactions /> },
        { path: "budgets", element: <Budgets /> },
        { path: "accounts", element: <Accounts /> },
        { path: "transactions/table", element: <Table /> },
        { path: "transactions/barchart", element: <Barchart /> },
        { path: "transactions/donutchart", element: <DonutChart /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
