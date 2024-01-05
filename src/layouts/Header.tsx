import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("auth.access_token");
    localStorage.removeItem("auth.refresh_token");
    navigate("/login");
  };
  return (
    <header className="bg-white p-2 shadow-sm">
      <nav className="mx-auto flex flex-row items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Button
          size="lg"
          onClick={() => {
            navigate("/home");
          }}>
          Home
        </Button>
        <Button
          size="lg"
          onClick={() => {
            navigate("/problems");
          }}>
          problemset
        </Button>
        <Button
          size="lg"
          onClick={() => {
            navigate("/contests");
          }}>
          Contests
        </Button>
        <Button
          size="lg"
          className="ml-auto"
          onClick={handleLogOut}>
          Log Out
        </Button>
        <Button
          size="lg"
          className="ml-auto"
          onClick={() => navigate("/contests")}>
          Contests
        </Button>
      </nav>
    </header>
  );
}

export default Header;
