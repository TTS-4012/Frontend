// import { Navigate, Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Main() {
  // if (!localStorage.getItem("auth.access_token")) return <Navigate to="/login" />;
  return (
    <div className="flex h-screen w-screen bg-indigo-100">
      <div className="m-auto w-full max-w-md rounded-lg bg-white p-3 shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
