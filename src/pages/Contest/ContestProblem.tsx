import ProblemComponent from "../../components/ProblemComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, PuzzlePieceIcon, TrophyIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import Link from "../../components/Link";
import Button from "../../components/Button";

type ContestProblemDataType = {
  ID: number;
  Title: string;
};

enum RegistrationStatus {
  Owner = 1,
  Registered,
  NonRegistered,
}

type ContestDataType = {
  contest_Id: number;
  title: string;
  start_time: number;
  duration: number;
  register_status: RegistrationStatus;
  problems: ContestProblemDataType[];
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
    <div className="flex flex-row gap-3 p-2">
      {contestData.start_time - Math.floor(new Date().valueOf() / 1000) > 0 ? (
        <>
          <CalendarIcon className="m-auto h-6 w-6 shrink-0" />
          <div className="flex grow flex-col">
            <div className="text-lg font-medium">
              {new Date(contestData.start_time * 1000).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-lg">
              {new Date(contestData.start_time * 1000).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
          </div>
        </>
      ) : contestData.start_time + contestData.duration - Math.floor(new Date().valueOf() / 1000) > 0 ? (
        <>
          <div className="mx-auto flex flex-row gap-2 py-2">
            <ClockIcon className="m-auto h-6 w-6 shrink-0" />
            <div
              className={`grow text-lg font-medium flex${
                (reverseTimer < 600 && reverseTimer >= 600 && "text-yellow-600") ||
                (reverseTimer < 60 && "text-red-600")
              }`}>
              {Math.floor(reverseTimer / 3600).toString().length == 1 && "0"}
              {Math.floor(reverseTimer / 3600)}: {Math.floor((reverseTimer % 3600) / 60).toString().length == 1 && "0"}
              {Math.floor((reverseTimer % 3600) / 60)}: {Math.floor(reverseTimer % 60).toString().length == 1 && "0"}
              {Math.floor(reverseTimer % 60)}
            </div>
          </div>
        </>
      ) : (
        <>
          <CalendarIcon className="m-auto h-6 w-6 shrink-0" />
          <div className="grow px-2 text-lg italic">This contest is finished</div>
        </>
      )}
    </div>
  );
}

const getActualProblemId = (problemId: string, contestData?: ContestDataType) => {
  if (contestData?.problems?.length) {
    if (contestData.problems.some((p) => String(p.ID) === problemId)) return problemId;
    return String(contestData.problems[0].ID);
  }
  return -1;
};

function ContestProblem() {
  const { contestId, problemId } = useParams<ParamsType>();
  const [contestData, setContestData] = useState<ContestDataType>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<ContestDataType>(`/contests/${contestId}`).then((res) => {
      setContestData(res.data);
    });
  }, [contestId]);

  const actualProblemId = getActualProblemId(problemId ?? "", contestData);

  return (
    contestData && (
      <div className="flex grow flex-row items-stretch gap-5 overflow-auto p-5">
        {actualProblemId == -1 ? (
          <p className="m-auto basis-5/6 text-center text-5xl italic text-gray-500">No problems</p>
        ) : (
          <ProblemComponent
            id={actualProblemId}
            className="basis-5/6"
          />
        )}
        <div className="flex min-w-[16rem] basis-1/6 flex-col gap-2">
          <div className="flex flex-col gap-1 rounded-t-lg bg-white p-1 shadow-md">
            <div className="relative border-b border-gray-200 p-4 text-center text-3xl font-bold text-gray-900 sm:px-6">
              {contestData.title}
              {contestData.register_status == RegistrationStatus.Owner && (
                <Button
                  className="absolute inset-y-0 right-4 my-auto"
                  size="zero"
                  variant="inline"
                  onClick={() => {
                    navigate(`/contests/${contestId}/edit`);
                  }}>
                  <Cog6ToothIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
            <ContestDuration contestData={contestData} />
          </div>
          {contestData.problems?.length > 0 && (
            <div className="flex flex-col space-y-1 bg-white p-1 shadow-md">
              <div className="border-b border-gray-200 p-2 font-medium text-gray-900 sm:px-4">Problems</div>
              {contestData.problems?.map((problem, i) => (
                <Link
                  key={i}
                  to={`/contests/${contestId}/problems/${problem.ID}`}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    problemId == String(problem.ID)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}>
                  {problem.Title.slice(0, 15)} {problem.Title.length > 15 && "..."}
                </Link>
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
              to={`/problems/${problemId}/submissions`}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <PuzzlePieceIcon className="h-5 w-5" />
              Submissions
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default ContestProblem;
