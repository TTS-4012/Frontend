import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

function Dashboard() {
  if (!localStorage.getItem("auth.access_token")) return <Navigate to="/login" />;
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-purple-100 from-20% via-indigo-100 to-emerald-100 to-80% pt-[46px]">
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}

export default Dashboard;
