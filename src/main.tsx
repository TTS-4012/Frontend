import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./layouts/Auth.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import Register from "./pages/Auth/Register.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import Login from "./pages/Auth/Login.tsx";
import OTPLogin from "./pages/Auth/OTPLogin.tsx";
import NewProblem from "./pages/Problems/NewProblem.tsx";
import Problem from "./pages/Problems/Problem.tsx";
import Home from "./pages/Home.tsx";
import axios from "axios";
import ContestProblem from "./pages/Problems/ContestProblem.tsx";

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
            Component: NewProblem,
          },
          {
            path: ":id",
            Component: Problem,
          },
        ],
      },
      {
        path: "contest",
        children: [
          {
            path: ":contestId/:problemId",
            Component: ContestProblem,
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
