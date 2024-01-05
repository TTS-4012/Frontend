import ProblemComponent from "../../components/ProblemComponent";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Link from "../../components/Link";
import {
  CalendarIcon,
  ClockIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/Button";

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
      <p className="border-b border-gray-200 p-4 text-center text-3xl font-bold text-gray-900 sm:px-6">
        {contestData.title}
      </p>
      <div className="flex flex-row gap-3 p-2">
        {contestData.start_time - Math.floor(new Date().valueOf() / 1000) > 0 ? (
          <>
            <CalendarIcon className="m-auto h-6 w-6 shrink-0" />
            <p className="flex grow flex-col">
              <p className="text-lg font-medium">
                {new Date(contestData.start_time * 1000).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-lg">
                {new Date(contestData.start_time * 1000).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </p>
          </>
        ) : contestData.start_time + contestData.duration - Math.floor(new Date().valueOf() / 1000) > 0 ? (
          <>
            <div className="mx-auto flex flex-row gap-2 py-2">
              <ClockIcon className="m-auto h-6 w-6 shrink-0" />
              <p
                className={`grow text-lg font-medium flex${
                  (reverseTimer < 600 && reverseTimer >= 600 && "text-yellow-600") ||
                  (reverseTimer < 60 && "text-red-600")
                }`}>
                {Math.floor(reverseTimer / 3600).toString().length == 1 && "0"}
                {Math.floor(reverseTimer / 3600)}:{" "}
                {Math.floor((reverseTimer % 3600) / 60).toString().length == 1 && "0"}
                {Math.floor((reverseTimer % 3600) / 60)}: {Math.floor(reverseTimer % 60).toString().length == 1 && "0"}
                {Math.floor(reverseTimer % 60)}
              </p>
            </div>
          </>
        ) : (
          <>
            <CalendarIcon className="m-auto h-6 w-6 shrink-0" />
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

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<ContestDataType>(`/contests/${contestId}`)
      .then((res) => {
        setContestData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [contestId]);

  const isValidProblemId = problemId == "0" || contestData?.problems?.some((p) => String(p.ID) === problemId);

  return (
    <>
      {contestData && (
        <div className="m-5 flex grow flex-row items-stretch gap-5">
          {isValidProblemId ? (
            <ProblemComponent
              id={String(Number(problemId) || contestData.problems[0].ID)}
              className="basis-5/6"
            />
          ) : (
            <p className="m-auto basis-5/6 text-center text-5xl text-indigo-800">Invalid problem</p>
          )}
          <div className="flex basis-1/6 flex-col gap-2">
            <ContestDuration contestData={contestData} />
            {contestData.problems?.length > 0 && (
              <div className="flex flex-col space-y-1 bg-white p-1 shadow-md">
                <div className="relative border-b border-gray-200 p-2 font-medium text-gray-900 sm:px-4">
                  Problems
                  <div className="absolute inset-y-0 right-4 my-auto flex gap-2">
                    <Button
                      size="zero"
                      variant="inline"
                      onClick={() => {
                        navigate(`/contests/${contestId}/new`);
                      }}>
                      <PlusCircleIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {contestData.problems?.map((problem, i) => (
                  <div
                    key={i}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      problemId == String(problem.ID)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <Link
                      to={`/contests/${contestId}/${problem.ID}`}
                      className="mr-auto">
                      {problem.Title.slice(0, 15)} {problem.Title.length > 15 && "..."}
                    </Link>
                    <Button
                      size="zero"
                      variant="inline"
                      onClick={() => {
                        navigate(`/contests/${contestId}/${problem.ID}/edit`);
                      }}>
                      <PencilIcon className="-m-1 h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col space-y-1 rounded-b-lg bg-white p-1 shadow-md">
              <Link
                to={`/contests/${contestId}/scoreboard`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <TrophyIcon className="h-5 w-5" />
                Scoreboard
              </Link>
              <Link
                to={`/contests/${contestId}/submissions`}
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
