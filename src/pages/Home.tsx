import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="m-5 flex h-screen w-full flex-col items-start gap-2">
      <Button
        type="button"
        size="md"
        onClick={() => {
          navigate("/problems");
        }}>
        problemset
      </Button>
      <Button
        size="md"
        onClick={() => {
          navigate("/problems/new");
        }}>
        New Problem
      </Button>
      <Button
        size="md"
        onClick={() => {
          navigate("/contests");
        }}>
        Contests
      </Button>
      <Button
        size="md"
        onClick={() => {
          navigate("/contests/new");
        }}>
        New Contest
      </Button>
    </div>
  );
}

export default Home;
