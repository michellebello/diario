import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import Budgets from "./components/Budgets";
import Barchart from "./components/Barchart";
import DonutChart from "./components/DonutChart";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/mycuenta",
          element: <Layout />,
          children: [
            { path: "transactions/table", element: <Transactions /> },
            { path: "transactions/barchart", element: <Barchart /> },
            { path: "transactions/donutchart", element: <DonutChart /> },
            { path: "budgets", element: <Budgets /> },
            { path: "accounts", element: <Accounts /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
