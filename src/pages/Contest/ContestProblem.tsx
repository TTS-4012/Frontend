import axios from "axios";
import { useState, useEffect } from "react";
import { CalendarIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { ContestDataType } from "./types";
import ContestSidebar from "./ContestSidebar";
import ProblemComponent from "../../components/ProblemComponent";

const getProblemId = (problemIndex?: string, contestData?: ContestDataType) => {
  const i = Number(problemIndex);
  if (isNaN(i)) return -1;

  if (!contestData) return -1;
  if (!contestData.problems) return -1;
  if (contestData.problems.length < i) return -1;

  return contestData.problems[i].ID;
};

function ContestProblem() {
  const { contestId, problemIndex } = useParams();
  const [contestData, setContestData] = useState<ContestDataType>();

  useEffect(() => {
    axios.get<ContestDataType>(`/contests/${contestId}`).then((res) => {
      setContestData(res.data);
    });
  }, [contestId]);

  const problemId = getProblemId(problemIndex, contestData);

  return contestId && contestData ? (
    contestData.problems ? (
      <div className="flex grow flex-row items-stretch gap-5 overflow-auto p-5">
        {problemId == -1 ? (
          <p className="m-auto basis-5/6 text-center text-5xl italic text-gray-500">Problem not available</p>
        ) : (
          <ProblemComponent
            id={String(problemId)}
            className="basis-5/6"
          />
        )}
        <ContestSidebar
          contestData={contestData}
          contestId={contestId}
        />
      </div>
    ) : (
      <div>
        <div>contest will start in </div>
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
      </div>
    )
  ) : (
    <div className="flex h-screen w-full text-indigo-800">
      <ArrowPathIcon className="m-auto h-20 w-20 animate-spin" />
    </div>
  );
}

export default ContestProblem;
