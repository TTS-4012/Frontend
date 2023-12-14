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

type TableDataType = {
  problems: ProblemDataType[];
  total_count: number;
};

type OrderDataType = {
  order_by: "hardness" | "solve_count" | "problem_id" | undefined;
  decending: boolean | undefined;
};

function ProblemsTable() {
  const [hardnessDecending, setHardnessDecending] = useState(true);
  const [solveDecending, setSolveDecending] = useState(true);
  const [order, setOrder] = useState<OrderDataType>({ order_by: "problem_id", decending: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [tableData, setTableData] = useState<ProblemDataType[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<ProblemDataType[]>("/problems", {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
        params: { limit: rowsPerPage, offset: page * rowsPerPage, ordered_by: order?.order_by, decendig: order?.decending, get_count: true },
      })
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        setErrorMessage(err.response?.data.message ?? err.message);
      });
    console.log(tableData);
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
  const handleOrdering = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, orderMethod: "hardness" | "solve_count", decending: boolean) => {
    if (orderMethod == "hardness") {
      setHardnessDecending(decending);
      setOrder(createOrder(orderMethod, hardnessDecending));
    } else {
      setSolveDecending(decending);
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
      <div className="flex flex-col gap-1 ">
        <div className="flex flex-row justify-start gap-0 rounded-sm bg-gray-300 pl-3 shadow-md">
          <p className="text-md px-5 py-2 font-bold ">Sort by </p>
          <button
            className=" rounded-r-sm px-5 py-2 text-sm font-bold text-black hover:bg-indigo-50 focus:text-white focus:outline-none focus:ring-1 focus:ring-indigo-50 "
            onClick={(e) => handleOrdering(e, "hardness", true)}>
            Hardest
          </button>

          <button
            className="rounded-r-sm px-5 py-2 text-sm font-bold hover:bg-indigo-50 focus:text-white focus:ring-1 focus:ring-indigo-50"
            onClick={(e) => handleOrdering(e, "hardness", false)}>
            Easiest
          </button>

          <button
            className="rounded-r-sm px-5 py-2 text-sm font-bold hover:bg-indigo-50 focus:text-white focus:ring-1 focus:ring-indigo-50"
            onClick={(e) => handleOrdering(e, "solve_count", true)}>
            Most Solved
          </button>
          <button
            className="rounded-r-sm px-5 py-2 text-sm font-bold hover:bg-indigo-50 focus:text-white focus:ring-1 focus:ring-indigo-50"
            onClick={(e) => handleOrdering(e, "solve_count", false)}>
            Least Solved
          </button>
        </div>
        <TableContainer
          component={Paper}
          className="px-8">
          <Table
            sx={{ minWidth: 650 }}
            size="small">
            <TableHead>
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
              {tableData?.map((problem, i) => (
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
                  className=""
                  rowsPerPageOptions={[20, 50, 100]}
                  colSpan={4}
                  count={tableData?.total_count ? tableData.total_count : -1}
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

export default ProblemsTable;
