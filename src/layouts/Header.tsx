import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  ArrowLeftStartOnRectangleIcon,
  ChartBarSquareIcon,
  HomeIcon,
  ListBulletIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("auth.access_token");
    localStorage.removeItem("auth.refresh_token");
    navigate("/login");
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white shadow-md">
      <nav className="m:px-6 mx-auto flex flex-row items-center gap-2 px-4 lg:px-8">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex gap-1 border-b-2 p-2.5 text-gray-600 ${isActive ? "border-indigo-600 text-black" : "border-transparent hover:border-gray-200 hover:text-black"}`
          }>
          <HomeIcon className="h-6 w-6" />
          Home
        </NavLink>
        <NavLink
          to="/problems"
          className={({ isActive }) =>
            `flex gap-1 border-b-2 p-2.5 text-gray-600 ${isActive ? "border-indigo-600 text-black" : "border-transparent hover:border-gray-200 hover:text-black"}`
          }>
          <ListBulletIcon className="h-6 w-6" />
          Problemset
        </NavLink>
        <NavLink
          to="/contests"
          className={({ isActive }) =>
            `flex gap-1 border-b-2 p-2.5 text-gray-600 ${isActive ? "border-indigo-600 text-black" : "border-transparent hover:border-gray-200 hover:text-black"}`
          }>
          <ChartBarSquareIcon className="h-6 w-6" />
          Contests
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `ml-auto border-b-2 p-2.5 text-gray-600 ${isActive ? "border-indigo-600 text-black" : "border-transparent hover:border-gray-200 hover:text-black"}`
          }>
          <UserCircleIcon className="h-6 w-6" />
        </NavLink>
        <Button
          size="lg"
          className="border-transparent pt-1.5 text-gray-600 hover:border-gray-200 hover:text-black"
          variant="inline"
          onClick={handleLogOut}>
          <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
        </Button>
      </nav>
    </header>
  );
}

export default Header;
