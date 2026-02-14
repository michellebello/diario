import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import Budgets from "./components/Budgets";
import BudgetBreakdown from "./components/BudgetBreakdown";
import Barchart from "./components/Barchart";
import DonutChart from "./components/DonutChart";
import { AppProvider } from "./contexts/context";

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
            { path: "accounts", element: <Accounts /> },
            { path: "budgets", element: <Budgets /> },
            { path: "budgets/:budgetId", element: <BudgetBreakdown /> },
          ],
        },
      ],
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
