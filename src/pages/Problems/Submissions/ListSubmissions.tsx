import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmissionsRow, { SubmissionData } from "./SubmissionsRow";

type ParamsType = {
  problemId: string;
};

type ProblemSubmissionListData = {
  total_count: number;
  submissions: SubmissionData[];
};

function ListSubmissions() {
  const { problemId } = useParams<ParamsType>();

  const [data, setData] = useState<ProblemSubmissionListData>();

  useEffect(() => {
    axios.get<ProblemSubmissionListData>(`/problems/${problemId}/submissions`).then((res) => {
      setData(res.data);
    });
  }, [problemId]);

  return (
    <>
      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data?.submissions?.map((submission, idx) => (
                    <SubmissionsRow
                      key={submission.metadata.submission_id}
                      data={submission}
                      index={idx}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListSubmissions;
