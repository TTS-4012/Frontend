import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex h-screen w-screen bg-indigo-100">
      <div className="m-auto w-full max-w-md rounded-lg bg-white p-3 shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
