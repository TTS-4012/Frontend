import ProblemComponent from "../../components/ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  contestId: string;
  problemId: string;
};

function ContestProblem() {
  const { contestId, problemId } = useParams<ParamsType>(); //<ParamsType></ParamsType>
  console.log(contestId, problemId);
  return (
    problemId && (
      <div className="flex flex-row">
        <div className=" basis-5/6">
          <ProblemComponent id={problemId}></ProblemComponent>;
        </div>

        <div className="m-5 basis-1/6 bg-white align-middle">
          <label className=" px-2 py-2 text-center"> {contestId} , hifasdfasdfdas </label>
        </div>
      </div>
    )
  );
}

export default ContestProblem;
