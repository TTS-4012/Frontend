import ProblemComponent from "../../components/ProblemComponent";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Link from "../../components/Link";
import { CalendarIcon, ClockIcon, PuzzlePieceIcon, TrophyIcon } from "@heroicons/react/24/outline";

type ContestProblemDataType = {
  ID: number;
  Title: string;
};

type ContestDataType = {
  contest_Id: number;
  title: string;
  start_time: number;
  problems: ContestProblemDataType[];
  duration: number;
};

type ParamsType = {
  contestId: string;
  problemId: string;
};

function ContestDuration({ contestData }: { contestData: ContestDataType }) {
  const [reverseTimer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (!contestData) return;

    const endTime = contestData.start_time + contestData.duration;
    setTimer(endTime - Date.now() / 1000);
    const intervalId = setInterval(() => setTimer((value) => value - 1), 1000);

    return () => clearInterval(intervalId);
  }, [contestData]);

  return (
    <div className="flex flex-col gap-1 rounded-t-lg bg-white p-1 shadow-md">
      <p className="border-b border-gray-200 p-4 text-3xl font-bold text-gray-900 sm:px-6">{contestData?.title}</p>
      <div className="flex flex-row gap-1 p-2">
        {contestData.start_time.valueOf() - new Date().valueOf() > 0 ? (
          <>
            <CalendarIcon className="m-auto h-6 w-6" />
            <p className="flex grow flex-col">
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
            </p>
          </>
        ) : contestData.start_time.valueOf() + contestData.duration * 1000 - new Date().valueOf() > 0 ? (
          <>
            <div className="mx-auto flex flex-row gap-2 py-2">
              <ClockIcon className="m-auto h-6 w-6" />
              <p
                className={`grow text-lg font-medium flex${
                  (reverseTimer < 600000 && reverseTimer >= 60000 && "text-yellow-600") ||
                  (reverseTimer < 60000 && "text-red-600")
                }`}>
                {Math.floor(reverseTimer / 3600000).toString().length == 1 && "0"}
                {Math.floor(reverseTimer / 3600000)}:{" "}
                {Math.floor((reverseTimer % 3600000) / 60000).toString().length == 1 && "0"}
                {Math.floor((reverseTimer % 3600000) / 60000)}:{" "}
                {Math.floor((reverseTimer % 60000) / 1000).toString().length == 1 && "0"}
                {Math.floor((reverseTimer % 60000) / 1000)}
              </p>
            </div>
          </>
        ) : (
          <>
            <CalendarIcon className="m-auto h-6 w-6" />
            <p className="grow px-2 text-lg italic">This contest is finished</p>
          </>
        )}
      </div>
    </div>
  );
}

function ContestProblem() {
  const { contestId, problemId } = useParams<ParamsType>();
  const [contestData, setContestData] = useState<ContestDataType>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<ContestDataType>(`/contests/${contestId}`, {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
      })
      .then((res) => {
        setContestData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [contestId]);

  return (
    <>
      {contestData && (
        <div className="m-5 flex flex-row gap-5">
          <ProblemComponent
            id={problemId!}
            className="basis-5/6"
          />
          <div className="flex basis-1/6 flex-col gap-2">
            <ContestDuration contestData={contestData} />
            <div className="flex flex-col space-y-1 bg-white p-1 shadow-md">
              <p className="border-b border-gray-200 p-2 text-gray-900 sm:px-4">problems</p>
              {contestData?.problems?.map((problem, i) => (
                <Link
                  key={i}
                  to={`/contests/${String(contestId)}/${String(problem.ID)}`}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    problemId == String(problem.ID)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}>
                  {problem.Title.slice(0, 15)} {problem.Title.length > 15 && "..."}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-1 rounded-b-lg bg-white p-1 shadow-md">
              <Link
                to={`/scoreboard`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <TrophyIcon className="h-5 w-5" />
                Scoreboard
              </Link>
              <Link
                to={`/submissions`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <PuzzlePieceIcon className="h-5 w-5" />
                Submissions
              </Link>
            </div>
          </div>
        </div>
      )}
      {errorMessage && <p className="m-auto text-center text-5xl text-indigo-800">{errorMessage}</p>}
    </>
  );
}

export default ContestProblem;
