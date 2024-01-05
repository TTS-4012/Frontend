import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ContestDataType = {
  contest_Id: number;
  title: string;
};

function CopyToContest() {
  const { problemId } = useParams();

  const [contests, setContests] = useState<ContestDataType[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    setErrorMessage("");
    axios
      .get<{ contests: ContestDataType[] }>("/contests", {
        params: {
          owned_contest: true,
        },
      })
      .then((res) => {
        setContests(res.data.contests);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, []);

  const handleAdd = (contestId: number) => {
    console.log(contestId, problemId);
  };

  return (
    <div>
      Choose a contest from list below:
      <ul
        role="list"
        className="divide-y divide-gray-200">
        {contests?.map((contest) => (
          <li
            key={contest.contest_Id}
            onClick={() => handleAdd(contest.contest_Id)}>
            <p className="py-4 text-sm font-medium text-gray-900">{contest.title}</p>
          </li>
        ))}
        <p>{errorMessage}</p>
      </ul>
    </div>
  );
}

export default CopyToContest;
