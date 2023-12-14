import ProblemComponent from "../../components/ProblemComponent";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkLabel from "../../components/LinkLabel";

type ProblemDataType = {
  problem_id: number;
  title: string;
};
type ContestDataType = {
  contest_Id: number;
  title: string;
  porblems: ProblemDataType[];
  start_time: string;
  duration: number;
};

type ParamsType = {
  contestId: string;
  problemId: string;
};

function ContestProblem() {
  const { contestId, problemId } = useParams<ParamsType>();
  const contest_bar = ["Ranking", "Uplaod History"];
  const [contestData, setContestmData] = useState<ContestDataType>({
    contest_Id: 10,
    title: "Contest Name",
    porblems: [
      { problem_id: 1, title: "problem1" },
      { problem_id: 2, title: "problem2" },
      { problem_id: 3, title: "problem3" },
    ],
    start_time: "00000000000000",
    duration: 6000,
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    setErrorMessage("");
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
  }, [contestId, problemId]);

  return (
    problemId && (
      <>
        {/* add !*/}
        {errorMessage && (
          <div className="flex flex-row">
            <div className=" basis-5/6">
              <ProblemComponent id={problemId}></ProblemComponent>;
            </div>

            <div className="mb-auto mr-5 mt-5 flex basis-1/6 flex-col rounded-lg pb-5 text-center">
              <div className="flex flex-col rounded-lg bg-gray-100 shadow-md">
                <p className="rounded-t-lg bg-gray-300 py-1.5 text-xl font-medium"> {contestData?.title} </p>
                {contestData?.porblems.map((problem, i) => (
                  <label
                    key={i}
                    className="rounded-md hover:bg-white">
                    {problemId != String(problem.problem_id) ? (
                      <LinkLabel
                        to={"/contests/" + String(contestId) + "/" + String(problem.problem_id)}
                        className="inline w-10 px-2 text-lg">
                        {problem.title.slice(0, 15)} {problem.title.length > 15 && "..."}
                      </LinkLabel>
                    ) : (
                      <LinkLabel
                        to={"/contests/" + String(contestId) + "/" + String(problem.problem_id)}
                        className=" inline w-10 px-2 text-lg font-semibold text-indigo-400">
                        {problem.title.slice(0, 15)} {problem.title.length > 15 && "..."}
                      </LinkLabel>
                    )}
                  </label>
                ))}
              </div>

              <span className="py-2"> </span>
              <div className="flex flex-col rounded-lg bg-gray-100 shadow-md ">
                {contest_bar.map((title) => (
                  <label
                    // key={j}
                    className="rounded-md py-1 hover:bg-white">
                    <LinkLabel
                      to={"/" + title}
                      className="inline w-10 px-2 text-xl">
                      {title}
                    </LinkLabel>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* {errorMessage && <p className="m-auto text-center text-5xl text-indigo-800">{errorMessage}</p>} */}
      </>
    )
  );
}

export default ContestProblem;
