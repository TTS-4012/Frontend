import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
import Register from './pages/Register.tsx';
import Verify from './pages/Verify.tsx';

const router = createBrowserRouter([
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/protect",
    Component: Register,
  },
  {
    path: "/enter",
    Component: Register,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
