import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function TablePaginationActions(props: {
  count: number;
  onPageChange: (e: any, n: number) => void;
  page: number;
  rowsPerPage: number;
}) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

type ContestDataType = {
  total_count: number;
  contests: {
    contest_Id: number;
    title: string;
    register_status: number;
  }[];
};

type FilterDataType = {
  started: boolean | undefined;
  my_contest: boolean | undefined;
};

function ListContests() {
  const [filterData, setFilterData] = useState<FilterDataType>({
    started: false,
    my_contest: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [tableData, setTableData] = useState<ContestDataType>();

  const [toggleUpdateData, UpdateTableData] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ContestDataType>("/contests", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: {
          limit: rowsPerPage,
          offset: page * rowsPerPage,
          started: filterData.started,
          my_contest: filterData.my_contest,
        },
      })
      .then((res) => {
        setTableData(res.data);
      });
  }, [page, rowsPerPage, filterData.started, filterData.my_contest, toggleUpdateData]);

  const handleClick = (_: unknown, contest_id: number, register_status: number) => {
    if (register_status == 2 || register_status == 1) {
      navigate(`/contests/${String(contest_id)}/problems/0`);
    } else {
      toast("Please first join the contest.");
    }
  };

  const handleJoinContest = (contest_id: number) => {
    toast.promise(
      axios
        .patch(`/contests/${String(contest_id)}`, undefined, {
          headers: { Authorization: localStorage.getItem("auth.access_token") },
          params: {
            action: "register",
          },
        })
        .then(() => {
          UpdateTableData(!toggleUpdateData);
        }),
      {
        loading: "Loading...",
        success: "Successfully joined",
        error: "Could not join contest. Please try again",
      },
    );
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <span className="m-auto"></span>
          <div className="flex flex-row justify-start gap-2 rounded-md bg-slate-400">
            <button
              className={`px-5 ${filterData.started && "rounded-md bg-slate-300"}`}
              onClick={() =>
                setFilterData({
                  started: true,
                  my_contest: filterData.my_contest,
                })
              }>
              Started
            </button>
            <button
              className={`px-5 ${!filterData.started && "rounded-md bg-slate-300"}`}
              onClick={() =>
                setFilterData({
                  started: false,
                  my_contest: filterData.my_contest,
                })
              }>
              Not Started yet
            </button>
          </div>
          <span className="px-1.5"></span>
          <div className="flex flex-row justify-start gap-2 rounded-md bg-slate-400">
            <button
              className={`px-5 ${filterData.my_contest && "rounded-md bg-slate-300"}`}
              onClick={() => setFilterData({ started: filterData.started, my_contest: true })}>
              Joined
            </button>
            <button
              className={`px-5 ${!filterData.my_contest && "rounded-md bg-slate-300"}`}
              onClick={() => setFilterData({ started: filterData.started, my_contest: false })}>
              All
            </button>
          </div>
          <Button
            size="lg"
            className="ml-auto flex gap-1"
            onClick={() => {
              navigate("/contests/new");
            }}>
            <PlusCircleIcon className="h-6 w-6" />
            Create contest
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small">
            <TableHead>
              <TableRow className=" bg-indigo-500 text-lg">
                <TableCell
                  align="left"
                  padding="checkbox">
                  <p className="pl-2 font-bold text-white">Number</p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-bold text-white  ">Contest Title</p>
                </TableCell>
                <TableCell
                  align="center"
                  padding="checkbox">
                  <p className="px-auto font-bold text-white">Status</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.contests.length == 0 && (
                <>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">
                      <p className=" text-lg font-medium italic text-slate-500"> no contests</p>
                    </TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </>
              )}
              {tableData?.contests?.map((contest, i) => (
                <TableRow
                  key={i}
                  sx={{ cursor: "pointer" }}>
                  <TableCell align="center">
                    <p className="text-lg">{page * rowsPerPage + i + 1}</p>
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={(event) => handleClick(event, contest.contest_Id, contest.register_status)}
                    className="rounded-sm hover:bg-blue-100">
                    <p className="text-lg font-medium">
                      {contest.title.slice(0, 25)} {contest.title.length > 25 && "..."}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    {contest.register_status == 1 && (
                      <button
                        className="rounded-md px-3 py-0.5 text-base hover:bg-slate-100"
                        onClick={() => {
                          navigate(`/contests/${contest.contest_Id}/edit`);
                        }}>
                        EDIT
                      </button>
                    )}
                    {contest.register_status == 2 && <p className="italic">Joined</p>}
                    {contest.register_status == 3 && (
                      <button
                        className="rounded-md px-3 py-0.5 text-base hover:bg-slate-100"
                        onClick={() => handleJoinContest(contest.contest_Id)}>
                        JOIN
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[20, 50, 100]}
                  colSpan={4}
                  count={tableData?.total_count || -1}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ListContests;
