import ProblemComponent from "../../components/ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  id: string;
};

function ContestProblem() {
  const { id } = useParams<ParamsType>();
  return id && <ProblemComponent id={id}></ProblemComponent>;
}

export default ContestProblem;
