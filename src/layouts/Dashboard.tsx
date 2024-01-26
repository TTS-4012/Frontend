import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

function Dashboard() {
  if (!localStorage.getItem("auth.access_token")) return <Navigate to="login" />;
  return (
    <div className="flex min-h-screen w-full flex-col bg-indigo-100">
      <Header />
      <Outlet />
    </div>
  );
}

export default Dashboard;
