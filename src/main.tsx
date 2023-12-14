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
import EditProblem from "./pages/Problems/EditProblem.tsx";
import ListProblems from "./pages/Problems/ListProblems.tsx";
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
            index: true,
            Component: ListProblems,
          },
          {
            path: "new",
            Component: EditProblem,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                Component: Problem,
              },
              {
                path: "edit",
                Component: EditProblem,
              },
            ],
          },
        ],
      },
      {
        path: "contests",
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
