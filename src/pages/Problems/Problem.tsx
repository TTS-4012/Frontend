import ProblemComponent from "../../components/ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  problemId: string;
};

function Problem() {
  const { problemId } = useParams<ParamsType>();
  return (
    problemId && (
      <ProblemComponent
        id={problemId}
        className="m-5"
      />
    )
  );
}

export default Problem;
