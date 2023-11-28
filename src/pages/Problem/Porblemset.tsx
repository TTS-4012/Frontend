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

function TablePaginationActions(props: { count: number; onPageChange: (e: any, n: number) => void; page: number; rowsPerPage: number }) {
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
        aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
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
type OrderDataType = {
  order_by: "hardness" | "solve_count" | "problem_id" | undefined;
  decending: boolean | undefined;
};

function ProblemsTable() {
  const [hardnessDecending, setHardnessDecending] = useState(true);
  const [solveDecending, setSolveDecending] = useState(true);
  const [order, setOrder] = useState<OrderDataType>({ order_by: "problem_id", decending: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [problemData, setProblemData] = useState<ProblemDataType[]>([createRowProblem(1, "this is first", 1300, 10), createRowProblem(2, "this is second", 1400, 5), createRowProblem(3, "this is third", 500, 10), createRowProblem(4, "amghezi", 2100, 5), createRowProblem(1, "this is first", 1300, 10), createRowProblem(2, "this is second", 1400, 5), createRowProblem(3, "this is third", 500, 10), createRowProblem(4, "amghezi", 2100, 5), createRowProblem(1, "this is first", 1300, 10), createRowProblem(2, "this is second", 1400, 5), createRowProblem(3, "this is third", 500, 10), createRowProblem(4, "amghezi", 2100, 5)]);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ProblemDataType[]>("/problems", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: { limit: rowsPerPage, offset: page * rowsPerPage, ordered_by: order?.order_by, decendig: order?.decending },
      })
      .then((res) => {
        setProblemData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [page, rowsPerPage, order]);

  const handleClick = (e: any, problem_id: number) => {
    navigate("/problems/" + String(problem_id));
  };
  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };
  const createOrder = (orderMethod: "hardness" | "solve_count", dec: boolean | undefined) => {
    return { order_by: orderMethod, decending: dec };
  };
  const handleOrdering = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, orderMethod: "hardness" | "solve_count") => {
    if (orderMethod == "hardness") {
      setHardnessDecending(!hardnessDecending);
      setOrder(createOrder(orderMethod, hardnessDecending));
    } else {
      setSolveDecending(!solveDecending);
      setOrder(createOrder(orderMethod, solveDecending));
    }
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
        <Table
          sx={{ minWidth: 650 }}
          size="small">
          <TableHead>
            <TableRow className=" max-h-10">
              <TableCell
                align="left"
                colSpan={2}></TableCell>
              <TableCell
                className=""
                align="center">
                <button
                  className="ml-0 rounded-r-sm px-5 py-2 text-sm font-bold hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-50 focus:ring-offset-1"
                  onClick={(e) => handleOrdering(e, "hardness")}>
                  {hardnessDecending && "Most"} {!hardnessDecending && "Least"}
                </button>
              </TableCell>
              <TableCell
                className=""
                align="center">
                <button
                  className=" ml-0 rounded-r-sm px-5 py-2  font-bold hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-50 focus:ring-offset-1"
                  onClick={(e) => handleOrdering(e, "solve_count")}>
                  {solveDecending && " Most "} {!solveDecending && "Least"}
                </button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-indigo-100">
              <TableCell
                align="left"
                padding="checkbox">
                <p className="pl-2 font-bold  ">Number</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold  text-violet-800">Problem</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold  text-violet-800">Hardness</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold  text-violet-800">Solve Count</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problemData.map((problem, i) => (
              <TableRow
                key={problem.problem_id}
                onClick={(event) => handleClick(event, problem.problem_id)}
                sx={{ cursor: "pointer" }}
                className="hover:bg-blue-100">
                <TableCell
                  className=" bg-blue-50"
                  align="center">
                  {page * rowsPerPage + i + 1}
                </TableCell>
                <TableCell align="center">
                  <p>
                    {problem.title.slice(0, 15)} {problem.title.length > 15 && "..."}
                  </p>
                </TableCell>
                <TableCell align="center">{problem.hardness}</TableCell>
                <TableCell align="center">{problem.solve_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
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
  );
}

export default ProblemsTable;
