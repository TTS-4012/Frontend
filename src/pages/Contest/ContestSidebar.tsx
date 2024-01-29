import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, PuzzlePieceIcon, TrophyIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Link from "../../components/Link";
import Button from "../../components/Button";
import { ContestDataType, RegistrationStatus } from "./types";

function ContestDuration({ contestData }: { contestData: ContestDataType }) {
  const [reverseTimer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (!contestData) return;

    const endTime = contestData.start_time + contestData.duration * 60;
    setTimer(endTime - Date.now() / 1000);
    const intervalId = setInterval(() => setTimer((value) => value - 1), 1000);

    return () => clearInterval(intervalId);
  }, [contestData]);

  const isNotFinished =
    contestData.start_time + contestData.duration * 60 - Math.floor(new Date().valueOf() / 1000) > 0;
  return (
    <div className="flex flex-row gap-3 p-2">
      {isNotFinished ? (
        <div className="mx-auto flex flex-row gap-2 py-2">
          <ClockIcon className="m-auto h-6 w-6 shrink-0" />
          <div
            className={`grow text-lg font-medium flex${
              (reverseTimer < 600 && reverseTimer >= 600 && "text-yellow-600") || (reverseTimer < 60 && "text-red-600")
            }`}>
            {Math.floor(reverseTimer / 3600).toString().length == 1 && "0"}
            {Math.floor(reverseTimer / 3600)}: {Math.floor((reverseTimer % 3600) / 60).toString().length == 1 && "0"}
            {Math.floor((reverseTimer % 3600) / 60)}: {Math.floor(reverseTimer % 60).toString().length == 1 && "0"}
            {Math.floor(reverseTimer % 60)}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-row gap-2 py-2">
          <CalendarIcon className="m-auto h-6 w-6 shrink-0" />
          <div className="grow px-2 text-lg italic">This contest is finished</div>
        </div>
      )}
    </div>
  );
}

type PropsType = {
  contestData: ContestDataType;
  contestId: string;
};

function ContestSidebar({ contestData, contestId }: PropsType) {
  const navigate = useNavigate();
  return (
    <div className="flex min-w-[16rem] basis-1/6 flex-col gap-2">
      <div className="flex flex-col gap-1 rounded-t-lg bg-white p-1 shadow-md">
        <div className="relative border-b border-gray-200 px-10 py-4 text-center text-3xl font-bold text-gray-900">
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
      {contestData.problems && contestData.problems.length > 0 && (
        <div className="flex flex-col space-y-1 bg-white p-1 shadow-md">
          <div className="border-b border-gray-200 p-2 font-medium text-gray-900 sm:px-4">Problems</div>
          {contestData.problems?.map((problem, i) => (
            <NavLink
              key={i}
              to={`/contests/${contestId}/problems/${problem.ID}`}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }>
              {problem.Title.slice(0, 15)} {problem.Title.length > 15 && "..."}
            </NavLink>
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
  );
}

export default ContestSidebar;
