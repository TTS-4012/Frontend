import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="m-5 flex items-start gap-2">
      <Button
        type="button"
        size="md"
        onClick={() => {
          navigate("");
        }}>
        problemset
      </Button>
      <Button
        size="md"
        onClick={() => {
          navigate("/problems/newproblem");
        }}>
        creat problem
      </Button>
      <Button
        size="md"
        onClick={() => {
          navigate("/contest/creat");
        }}>
        creat contest
      </Button>
    </div>
  );
}

export default Home;
