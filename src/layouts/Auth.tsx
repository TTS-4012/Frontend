import { Navigate, Outlet } from "react-router-dom";

function Auth() {
  if (localStorage.getItem("auth.access_token")) return <Navigate to="/home" />;
  return (
    <div className="flex h-screen w-screen bg-indigo-100">
      <div className="m-auto w-full max-w-md rounded-lg bg-gradient-to-br from-purple-100 from-20% via-indigo-100 to-emerald-100 to-80% p-3 shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
