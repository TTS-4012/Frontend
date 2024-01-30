import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmissionsRow, { SubmissionData } from "./SubmissionsRow";

type ProblemSubmissionListData = {
  total_count: number;
  submissions: SubmissionData[];
};

function ListSubmissions() {
  const { problemId, contestId } = useParams();

  const [data, setData] = useState<ProblemSubmissionListData>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowPerPage, setRowPerPage] = useState<number>(100);

  useEffect(() => {
    axios
      .get<ProblemSubmissionListData>(`${contestId ? `contests/${contestId}` : ``}/problems/${problemId}/submissions`, {
        params: { descending: true, limit: rowPerPage, offset: (pageNumber - 1) * rowPerPage },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [pageNumber, rowPerPage, contestId, problemId]);

  return (
    <>
      <div className="w-full flex-1 overflow-auto">
        <div className="relative mx-auto mt-8 flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
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
                        index={idx + (pageNumber - 1) * rowPerPage}
                      />
                    ))}
                    <tr className="bg-gray-50">
                      <td
                        colSpan={5}
                        className="rounded-b-md py-2">
                        <div className="flex flex-row gap-2">
                          <p className="my-auto ml-auto">page number</p>
                          <input
                            value={pageNumber}
                            onChange={(e) => setPageNumber(+e.target.value)}
                            className="h-7 w-14 rounded-md text-center"
                          />
                          <p className="my-auto">row per page</p>
                          <input
                            value={rowPerPage}
                            onChange={(e) => setRowPerPage(+e.target.value)}
                            className="mr-5 h-7 w-14 rounded-md text-center"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListSubmissions;
