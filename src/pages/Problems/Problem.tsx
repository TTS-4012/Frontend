import ProblemComponent from "../../components/ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  problemId: string;
};

function Problem() {
  const { problemId } = useParams<ParamsType>();
  return (
    problemId && (
      <div className="w-full flex-1 overflow-auto">
        <ProblemComponent
          id={problemId}
          className="m-5"
        />
      </div>
    )
  );
}

export default Problem;
