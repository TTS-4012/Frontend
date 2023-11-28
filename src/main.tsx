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
import SpanningTable from "./pages/Problem/Porblemset.tsx";

import axios from "axios";
import Problem from "./pages/Problem.tsx";
import ProblemCreation from "./pages/Problems/ProblemCreation.tsx";
import Dashboard from "./layouts/Dashboard.tsx";

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
    Component: Dashboard,
    children: [
      {
        path: "problems",
        children: [
          {
            path: "new",
            Component: ProblemCreation,
          },
          {
            path: ":id",
            Component: Problem,
          },
          {
            index: true,
            Component: SpanningTable,
          },
        ],
      },
      {
        path: "*",
        Component: Home,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
