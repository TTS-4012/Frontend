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
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

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

// type ContestDataType = {
//   total_count: number;
//   contests: {
//     contest_Id: number;
//     title: string;
//     register_status: number;
//   }[];
// };

type ContestDataType = {
  contest_Id: number;
  title: string;
  register_status: number;
};

type FilterDataType = {
  started: boolean | undefined;
  my_contest: boolean | undefined;
  owned_contest: boolean | undefined;
};

function ListContests() {
  const decsendingTable = false;
  const [filterData, setFilterData] = useState<FilterDataType>({
    started: false,
    my_contest: false,
    owned_contest: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [openDialog, setOpenDialog] = useState(false);

  const [tableData, setTableData] = useState<ContestDataType[]>();

  const [toggleUpdateData, UpdateTableData] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageJoinContest, setErrorMessageJoinContest] = useState<string>("");
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
          started: filterData.started,
          my_contest: filterData.my_contest,
        },
      })
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
    console.log(tableData);
  }, [page, rowsPerPage, filterData, decsendingTable, toggleUpdateData, tableData]);

  const handleClick = (_: unknown, contest_id: number, register_status: number) => {
    if (register_status == 2 || register_status == 1) {
      navigate(`/contests/${String(contest_id)}/0`);
    } else {
      console.log("please first register");
    }
    console.log(register_status);
  };
  const handleJoinContest = (contest_id: number) => {
    setErrorMessageJoinContest("");
    axios
      .post<number>(`/contests/${String(contest_id)}`, {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: {
          action: "register",
        },
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessageJoinContest(err.response?.data.message ?? err.message);
      })
      .then(() => {
        setOpenDialog(true);
      });
    // setOpenDialog(true);
    UpdateTableData(!toggleUpdateData);
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
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}>
          <DialogTitle
            className={`${!errorMessageJoinContest && "bg-green-800"} ${errorMessageJoinContest && "bg-red-800"}`}>
            {"Joining the Contest"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className=" text-lg font-medium">
              {errorMessageJoinContest && "Could not join the contest"}
              {!errorMessageJoinContest && "Succesfuly joined the contest"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <div className="flex flex-row justify-start rounded-sm bg-slate-400 pl-3 shadow-sm">
          <p className="px-5 py-2 font-bold">Sort by </p>
          <button
            className={`px-5 ${filterData.started && "bg-slate-300"}`}
            onClick={() =>
              setFilterData({
                started: true,
                my_contest: filterData.my_contest,
                owned_contest: filterData.owned_contest,
              })
            }>
            Started
          </button>
          <button
            className={`px-5 ${!filterData.started && "bg-slate-300"}`}
            onClick={() =>
              setFilterData({
                started: false,
                my_contest: filterData.my_contest,
                owned_contest: filterData.owned_contest,
              })
            }>
            Not Started
          </button>
          <button
            className={`px-5 ${filterData.my_contest && "bg-slate-300"}`}
            onClick={() => setFilterData({ started: filterData.started, my_contest: true, owned_contest: true })}>
            My Contests
          </button>
          <button
            className={`px-5 ${!filterData.my_contest && "bg-slate-300"}`}
            onClick={() => setFilterData({ started: filterData.started, my_contest: false, owned_contest: false })}>
            Other Contests
          </button>
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
                  <p className="pl-2 font-bold">Number</p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-bold  ">Contest Title</p>
                </TableCell>
                <TableCell
                  align="center"
                  padding="checkbox">
                  <p className="px-auto font-bold ">Joined</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* tableData?.contests?.map */}
              {tableData?.length == 0 && (
                <>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">
                      <p className=" text-lg font-medium italic text-slate-500"> no problems</p>
                    </TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </>
              )}
              {tableData?.map((contest, i) => (
                <TableRow
                  key={i}
                  sx={{ cursor: "pointer" }}>
                  <TableCell
                    className=" bg-blue-50"
                    align="center">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={(event) => handleClick(event, contest.contest_Id, contest.register_status)}
                    className="hover:bg-blue-100">
                    <p className="text-lg·font-medium">
                      {contest.title.slice(0, 25)} {contest.title.length > 25 && "..."}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    {contest.register_status == 1 && <p>Open and edit</p>}
                    {contest.register_status == 2 && <p>Allready joined</p>}
                    {true && (
                      <>
                        <Button
                          className=" py-auto px-auto hover:bg-slate-200"
                          onClick={() => handleJoinContest(contest.contest_Id)}>
                          Join
                        </Button>
                      </>
                    )}
                    {/* {errorMessageJoinContest && <p> could not join </p>} */}
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
                  // tableData?.total_count || -1
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
