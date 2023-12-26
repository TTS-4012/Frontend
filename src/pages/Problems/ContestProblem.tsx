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
  start_time: Date;
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
    contest_Id: 1,
    title: "Contest Name",
    porblems: [
      { problem_id: 1, title: "problem1" },
      { problem_id: 2, title: "problem2" },
      { problem_id: 3, title: "problem3" },
    ],
    start_time: new Date("2023-12-27T00:50:00"),
    duration: 660,
  });
  const [reverseTimer, setTimer] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    setErrorMessage("");
    setInterval(
      () => setTimer(contestData.start_time.valueOf() - new Date().valueOf() + contestData.duration* 1000),
      1000,
    );
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
            <div className="flex flex-col rounded-lg bg-gray-100 shadow-md ">
              {(contestData.start_time.valueOf() - new Date().valueOf() > 0) ? (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                    <p className="text-lg font-medium">
                      {contestData.start_time.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-lg">
                      {contestData.start_time.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                    </>) : (contestData.start_time.valueOf() + contestData.duration* 1000  - new Date().valueOf() > 0) ? ( <>
                <div className="flex flex-row mx-auto gap-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                  <p className={` text-lg font-medium m-auto flex${reverseTimer < 600000 && reverseTimer >= 60000 && "text-yellow-600" || reverseTimer < 60000 && "text-red-600"}`}>
                  {Math.floor(reverseTimer / 3600000).toString().length == 1 && "0" }{Math.floor(reverseTimer / 3600000)}: {Math.floor((reverseTimer % 3600000) / 60000).toString().length == 1 && "0" }{Math.floor((reverseTimer % 3600000) / 60000)}: {Math.floor((reverseTimer % 60000)/1000).toString().length == 1 && "0" }{Math.floor((reverseTimer % 60000)/1000)}
                  </p>
                </div>
                </>) : (<>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                <p className="px-2 text-lg italic"> This contest has ended</p>
                
                </>)}
              </div>
              <span className="py-2"> </span>
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
                      to={problemId + "/" + title}
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
