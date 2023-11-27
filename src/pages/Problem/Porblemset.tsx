import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
// import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

function TablePaginationActions(props: { count: number; onPageChange: (e: any, n: number) => void; page: number; rowsPerPage: number }) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
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
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

type ProblemDataType = {
  problem_id: number;
  title: string;
  solve_count: number;
  hardness: number;
  // TODO : tag
};

function createRowProblem(id: number, t: string, h: number, count: number) {
  return { problem_id: id, title: t, hardness: h, solve_count: count };
}
// type FormDataType = {
//   limit: number;
//   order_by: string;
//   decending: boolean;
//   offset: number
// };

function ProblemsTable() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<FormDataType>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [problemData, setProblemData] = useState<ProblemDataType[]>([createRowProblem(1, "this is first", 1300, 10), createRowProblem(2, "this is second", 1400, 5), createRowProblem(3, "this is third", 500, 10), createRowProblem(4, "amghezi", 2100, 5)]);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ProblemDataType[]>("/problems", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: { limit: rowsPerPage, offset: page * rowsPerPage },
      })
      .then((res) => {
        setProblemData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [page, rowsPerPage]);

  // setProblemData();
  // getProblems();
  const handleClick = (e: any, problem_id: number) => {
    navigate("/problems/" + String(problem_id));
  };
  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-2">
      <div className="py-2">{errorMessage && <span className="ml-3 text-red-700">{errorMessage}</span>}</div>
      <TableContainer
        component={Paper}
        className="px-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                padding="checkbox">
                <p className="font-bold">Number</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold">Problem</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold">Hardness</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold">Solve Count</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problemData.map((problem, i) => (
              <TableRow
                key={problem.problem_id}
                onClick={(event) => handleClick(event, problem.problem_id)}
                role="checkbox"
                sx={{ cursor: "pointer" }}
                className="hover:bg-blue-50">
                <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                <TableCell align="center">
                  <p>{problem.title} </p>
                </TableCell>
                <TableCell align="center">{problem.hardness}</TableCell>
                <TableCell align="right">{problem.solve_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 5, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={problemData.length}
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
  );
}

export default ProblemsTable;
