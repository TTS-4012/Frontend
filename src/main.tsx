import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css';
import Auth from './layouts/Auth.tsx';
import Register from './pages/Register.tsx';
import Verify from './pages/Verify.tsx';
import Login from './pages/Login.tsx';
import Secure from './pages/Secure.tsx';

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
        path: "/secure",
        Component: Secure,
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
