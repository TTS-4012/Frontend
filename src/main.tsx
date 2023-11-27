import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./layouts/Auth.tsx";
import Register from "./pages/Auth/Register.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import Login from "./pages/Auth/Login.tsx";
import Home from "./pages/Home.tsx";
import OTPLogin from "./pages/Auth/OTPLogin.tsx";
import axios from "axios";
import Problem from "./pages/Problem.tsx";

axios.defaults.baseURL = "https://api.ocontest.ir/v1";

const router = createBrowserRouter([
  {
    Component: Auth,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/verify",
        Component: Verify,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/otp-login",
        Component: OTPLogin,
      },
    ],
  },
  {
    path: "/problem/:id",
    Component: Problem,
  },
  {
    path: "/home",
    Component: Home,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
