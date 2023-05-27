import { useEffect, useState } from "react";
import { useGetUsersByDealerQuery } from "../../services/API/userApiSlice";
import { Helmet } from "react-helmet-async";

import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  TableHead,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

//---------------------------- TablePaginationActions START--------------------------------//
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
//---------------------------- TablePaginationActions END --------------------------------//

const User = () => {
  const [users, setUsers] = useState([] as any);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Data Fetching
  const { data, isFetching, isError } = useGetUsersByDealerQuery();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  // ----------------------- HANDLERS ---------------------------//

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h6" gutterBottom>
            Users
          </Typography>

          {/* Search Filter */}
          {/* <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              id="outlined-start-adornment"
              placeholder="Search by Name"
              sx={{ m: 1, width: "30ch" }}
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box> */}
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>User Id</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="left">
                    <CircularProgress size="2rem" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ) : (
                <>
                  {users
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: any) => (
                      <TableRow key={row.userId}>
                        <TableCell component="th" scope="row">
                          {row.userId}
                        </TableCell>

                        <TableCell align="left">{row.fullName}</TableCell>

                        <TableCell align="left">{row.email}</TableCell>

                        <TableCell align="left">{row.phoneNumber}</TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={users?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default User;
