import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./layouts/Auth.tsx";
import Register from "./pages/Register.tsx";
import Verify from "./pages/Verify.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ForgotPass from "./pages/ForgotPass.tsx";
import LoginWithOTP from "./pages/LoginWithOTP.tsx";
import DashBoard from "./pages/DashBoard.tsx";

const router = createBrowserRouter([
  {
    Component: Auth,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/verify",
        Component: Verify,
      },
      {
        path: "/forgotpass",
        Component: ForgotPass,
      },
      {
        path: "/loginwithotp",
        Component: LoginWithOTP,
      },
    ],
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/dashboard",
    Component: DashBoard,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
