import { ArrowRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ProblemDataType = {
  problem_id: number;
  title: string;
  solve_count: number;
  hardness: number;
};

type ContestDataType = {
  contest_Id: number;
  title: string;
  register_status: number;
};

function Home() {
  const [username, setUsername] = useState<string>();
  const [problems, setProblems] = useState<ProblemDataType[]>();
  const [contests, setContests] = useState<ContestDataType[]>();

  useEffect(() => {
    axios.get("/auth").then((res) => {
      setUsername(res.data?.username);
    });
    axios
      .get<{ problems: ProblemDataType[] }>("/problems", {
        params: {
          limit: 25,
          offset: 0,
          order_by: "problem_id",
          descending: true,
        },
      })
      .then((res) => {
        const a = res.data.problems;
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        setProblems(a.slice(0, 5));
      });
    axios
      .get<{ contests: ContestDataType[] }>("contests", {
        params: {
          limit: 5,
          offset: 0,
          started: false,
          my_contest: true,
        },
      })
      .then((res) => {
        setContests(res.data.contests);
      });
  }, []);

  return (
    <div className="mx-auto mt-24 grid w-full max-w-5xl grid-cols-2 gap-3">
      <div className="col-span-2 py-8 text-4xl font-bold tracking-tight text-indigo-700">Hi, {username}. 👋</div>
      <div className="flex flex-col items-stretch rounded-lg bg-white px-6 py-3 shadow">
        <span className="pb-4 pt-2 text-2xl font-semibold text-indigo-700">Solve Problems</span>
        {problems?.map((p) => (
          <Link
            className="rounded-lg p-2 text-gray-900 hover:bg-indigo-50"
            to={`/problems/${p.problem_id}`}>
            {p.title}
          </Link>
        ))}
        <Link
          className="mt-auto flex flex-row items-center gap-2 self-center rounded-lg px-4 py-2 text-indigo-700 hover:bg-indigo-50"
          to="/problems">
          More
          <ArrowRightIcon className="h-5 w-5 stroke-1" />
        </Link>
      </div>
      <div className="flex flex-col items-stretch rounded-lg bg-white px-6 py-3 shadow">
        <span className="pb-4 pt-2 text-2xl font-semibold text-indigo-700">Compete in Contests</span>
        {contests?.map((c) => (
          <Link
            className="rounded-lg p-2 text-gray-900 hover:bg-indigo-50"
            to={`/contests/${c.contest_Id}`}>
            {c.title}
          </Link>
        ))}
        <Link
          className="mt-auto flex flex-row items-center gap-2 self-center rounded-lg px-4 py-2 text-indigo-700 hover:bg-indigo-50"
          to="/contests">
          More
          <ArrowRightIcon className="h-5 w-5 stroke-1" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
