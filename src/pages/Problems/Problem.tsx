import ProblemComponent from "./ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  id: string;
};

function Problem() {
  const { id } = useParams<ParamsType>();
  return id && <ProblemComponent id={id}></ProblemComponent>;
}

export default Problem;
