import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";

type ContestDataType = {
  contest_Id: number;
  title: string;
};

function CopyToContest(props: { onClose: () => void }) {
  const { problemId } = useParams();

  const [contests, setContests] = useState<ContestDataType[]>();
  useEffect(() => {
    axios
      .get<{ contests: ContestDataType[] }>("/contests", {
        params: {
          owned_contest: true,
        },
      })
      .then((res) => {
        setContests(res.data.contests);
      });
  }, []);

  const handleAdd = (contestId: number) => {
    axios.post(`contests/${contestId}/problems/${problemId}`).then(() => {
      props.onClose();
    });
  };

  return (
    <div>
      Choose a contest from list below:
      <div
        role="list"
        className="flex flex-col divide-y divide-gray-200">
        {contests?.map((contest) => (
          <Button
            size="lg"
            variant="inline"
            key={contest.contest_Id}
            onClick={() => handleAdd(contest.contest_Id)}
            className="font-medium text-gray-900">
            {contest.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CopyToContest;
