



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
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

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

type Problem = {
    title: string;
    score: number;
}
type User = {
    name: string;
    problems: Problem[];
}


type LeaderboardDataType = {
    count: number;
    users: User[];
}

function Leaderboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardDataType>({count:3,users:[{name: "ali" , problems:[{title:"title2", score:50},{title:"title2", score:75}]},{name: "mobin" , problems:[{title:"title2", score:40},{title:"title2", score:90}]}]});

  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<LeaderboardDataType>("/leaderboard", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        // params: {
        //   limit: rowsPerPage,
        //   offset: page * rowsPerPage,
        //   ordered_by: order?.order_by,
        //   decendig: order?.decending,
        //   get_count: true,
        // },
      })
      .then((res) => {
        setLeaderboardData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [page, rowsPerPage]);


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
        
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small">
            <TableHead>
              <TableRow className="bg-gray-300">
                <TableCell
                  align="left"
                  padding="checkbox">
                  <p className="pl-2 font-bold  ">Number</p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-bold  ">User</p>
                </TableCell>
                {leaderboardData?.users[0].problems?.map((problem, j) => (

                    <TableCell align="center" key={j}>
                        <p className="font-bold">{problem.title.slice(0, 15)} {problem.title.length > 15 && "..."}</p>
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData?.users.map((user, i) => (
                <TableRow
                  key={i}
                  sx={{ cursor: "pointer" }}
                  className="hover:bg-blue-100">
                  <TableCell
                    className=" bg-blue-50"
                    align="center">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  {user.problems?.map((problem, k) => (

                    <TableCell align="center" key={k}>
                        <p>
                        {problem.score}
                        </p>
                    </TableCell>

                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className=""
                  rowsPerPageOptions={[20, 50, 100]}
                  colSpan={4}
                  count={leaderboardData?.count?? -1}
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

export default Leaderboard;
