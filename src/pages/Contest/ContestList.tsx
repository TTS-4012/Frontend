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
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Button from "../../components/Button";

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
        disabled={count != -1 && page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

type ContestDataType = {
  contest_Id: number;
  title: string;
};

function ListContests() {
  const decsendingTable = false;
  const [started, setStarted] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [tableData, setTableData] = useState<ContestDataType[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<ContestDataType[]>("/contests", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: {
          descendig: decsendingTable,
          limit: rowsPerPage,
          offset: page * rowsPerPage,
          started: started,
        },
      })
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [page, rowsPerPage, started, decsendingTable]);

  const handleClick = (_: unknown, contest_id: number) => {
<<<<<<< HEAD
    navigate(`/contests/${String(contest_id)}/0`);
=======
    navigate("/contests/" + String(contest_id) + "/0");
>>>>>>> 67dd149 (fix: bug path fixed)
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
      <div className="py-2">{errorMessage && <span className="ml-3 text-red-700">{errorMessage}</span>}</div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-start rounded-sm bg-slate-400 pl-3 shadow-sm">
          <p className="my-auto px-5 py-2 font-bold">Sort by </p>
          <button
            className={`px-5 ${started && "bg-slate-300"}`}
            onClick={() => setStarted(true)}>
            Started
          </button>
          <button
            className={`px-5 ${!started && "bg-slate-300"}`}
            onClick={() => setStarted(false)}>
            Not Started
          </button>
          <Button
            size="lg"
            className="my-1 ml-auto mr-2"
            onClick={() => {
              navigate("/contests/new");
            }}>
            create contest
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small">
            <TableHead>
              <TableRow className=" bg-cyan-600">
                <TableCell
                  align="left"
                  padding="checkbox">
                  <p className="pl-2 font-bold  ">Number</p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-bold  ">Contest Title</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((contest, i) => (
                <TableRow
                  key={i}
                  onClick={(event) => handleClick(event, contest.contest_Id)}
                  sx={{ cursor: "pointer" }}
                  className="hover:bg-blue-100">
                  <TableCell
                    className=" bg-blue-50"
                    align="center">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-lg·font-medium">
                      {contest.title.slice(0, 25)} {contest.title.length > 25 && "..."}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className=""
                  rowsPerPageOptions={[20, 50, 100]}
                  colSpan={4}
                  count={-1}
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
