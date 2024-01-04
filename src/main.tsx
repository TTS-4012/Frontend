import axios, { AxiosError } from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./layouts/Auth.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import Register from "./pages/Auth/Register.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import NewContest from "./pages/Contest/NewContest.tsx";
import EditProblem from "./pages/Problems/EditProblem.tsx";
import ListProblems from "./pages/Problems/ListProblems.tsx";
import ListSubmissions from "./pages/Problems/Submissions/ListSubmissons.tsx";
import Problem from "./pages/Problems/Problem.tsx";
import Home from "./pages/Home.tsx";
import ListContests from "./pages/Contest/ListContests.tsx";
import Login from "./pages/Auth/Login.tsx";
import OTPLogin from "./pages/Auth/OTPLogin.tsx";

axios.defaults.baseURL = "http://0.0.0.0:8080/v1";

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
            path: ":problemId",
            children: [
              {
                index: true,
                Component: Problem,
              },
              {
                path: "edit",
                Component: EditProblem,
              },
              {
                path: "submissions",
                Component: ListSubmissions,
              },
            ],
          },
        ],
      },
      {
        path: "contests",
        children: [
          {
            path: "",
            Component: ListContests,
          },
          {
            path: "new",
            Component: NewContest,
          },
          {
            path: ":contestId",
            children: [
              {
                path: "edit",
                Component: EditContest,
              },
              {
                path: "problems",
                children: [
                  {
                    path: "new",
                    Component: EditProblem,
                  },
                  {
                    path: ":problemId",
                    Component: ContestProblem,
                  },
                ],
              },
            ],
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

axios.defaults.baseURL = "http://0.0.0.0:8080/v1";
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("auth.access_token"))
      config.headers["Authorization"] = localStorage.getItem("auth.access_token");
    return config;
  },
  (error: AxiosError) => {
    if (error.code == "401") {
      localStorage.removeItem("auth.access_token");
      localStorage.removeItem("auth.refresh_token");
      router.navigate("/login");
    }
  },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
