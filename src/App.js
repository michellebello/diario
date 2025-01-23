import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
