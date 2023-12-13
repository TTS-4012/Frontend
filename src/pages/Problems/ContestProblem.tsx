import ProblemComponent from "../../components/ProblemComponent";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkLabel from "../../components/LinkLable";

type ProblemDataType = {
  problem_id: number;
  title: string;
  _: number;
};
type ContestDataType = {
  title: string;
  porblems: ProblemDataType[];
};
type ParamsType = {
  contestId: string;
  problemId: string;
};

function ContestProblem() {
  const { contestId, problemId } = useParams<ParamsType>(); //<ParamsType></ParamsType>
  console.log(contestId, problemId);
  const [contestData, setContestmData] = useState<ContestDataType>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    axios
      .get<ContestDataType>("/contest/" + String(contestId), {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
      })
      .then((res) => {
        setContestmData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  });

  // setErrorMessage("this is error");
  return (
    problemId && (
      <>
        {errorMessage && (
          <div className="flex flex-row">
            <div className=" basis-5/6">
              <ProblemComponent id={problemId}></ProblemComponent>;
            </div>

            <div className="mb-auto mr-5 mt-5 flex basis-1/6 flex-col rounded-lg bg-white py-5 text-center">
              <label className=" border-2 py-2 text-xl"> Problems </label>
              <LinkLabel
                to="/1"
                className="px-2 w-10">
                hi
              </LinkLabel>
            </div>
          </div>
        )}
        <div className="flex h-screen w-full text-indigo-800">
          {errorMessage && <p className="m-auto text-center text-5xl">{errorMessage}</p>}
        </div>
      </>
    )
  );
}

export default ContestProblem;
