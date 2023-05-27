import * as React from "react";
import { useState, useEffect } from "react";
import { ITransaction } from "../../types/types";
import { useGetDealerTransactionsQuery } from "../../services/API/transactionsApiSlice";

import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.css";
import moment from "moment";
import { Helmet } from "react-helmet-async";

import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TableHead,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  startOfDay,
  endOfDay,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { DateRangePickerProps } from "rsuite";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

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
    onPageChange(event, 1);
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

const Ranges: DateRangePickerProps["ranges"] = [
  {
    label: "Today",
    value: [startOfDay(new Date()), endOfDay(new Date())],
    placement: "left",
  },

  {
    label: "Yesterday",
    value: [
      startOfDay(addDays(new Date(), -1)),
      endOfDay(addDays(new Date(), -1)),
    ],
    placement: "left",
  },

  {
    label: "Last 7 Days",
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
    placement: "left",
  },

  {
    label: "This Week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },

  {
    label: "Next Week",
    closeOverlay: false,
    value: (value) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7),
      ];
    },
    placement: "left",
  },
];

const Transaction = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<ITransaction[]>([]);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  const dealerId = useAppSelector((state: RootState) => state.dealer.dealerId);

  // Data Fetching
  const { data, isLoading, isFetching } = useGetDealerTransactionsQuery({
    dealerId,
    page,
    rowsPerPage, // pageSize
    customerName: filterType === "customerName" ? searchQuery : "",
    cardNumber: filterType === "cardNumber" ? searchQuery : "",
  });

  useEffect(() => {
    setFilteredData(data?.data ?? []);
  }, [data]);

  // DateRange Filters Logic
  useEffect(() => {
    const filterData = data?.data?.filter((item) => {
      // Filter by date range
      if (dateRange) {
        const itemDate = new Date(item.transactionDate);
        if (itemDate < dateRange[0] || itemDate > dateRange[1]) {
          return false;
        }
      }

      return true;
    });

    setFilteredData(filterData ?? []);
  }, [data, dateRange]);

  // ----------------------- HANDLERS ---------------------------//

  const handleDateValueChange = (value: [Date, Date] | null) => {
    if (value) {
      setDateRange(value);
    } else {
      setDateRange(null); // Clear the filter
    }
  };

  const handleClose = () => {
    setDateRange(null); // Clear the filter
  };

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
    setPage(1);
  };

  return (
    <>
      <Helmet>
        <title> Transaction </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h6" gutterBottom>
            Transactions
          </Typography>

          {/***** Filter Section *****/}
          <Stack direction="row" alignItems="center">
            {/* Date range filter */}
            <Box mr={4}>
              <DateRangePicker
                character=" -- "
                ranges={Ranges}
                size="lg"
                placeholder="Date Range"
                value={dateRange}
                onChange={handleDateValueChange}
                onClean={handleClose}
                format="dd-MM-yyyy"
                placement="autoVertical"
              />
            </Box>

            {/* Filter type dropdown */}
            <FormControl sx={{ mr: 1, minWidth: 150 }} size="small">
              <InputLabel id="filter-type-label">Filter Type</InputLabel>
              <Select
                labelId="filter-type-label"
                id="filter-type-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as string)}
                label="Filter Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="customerName">Name</MenuItem>
                <MenuItem value="cardNumber">Card Number</MenuItem>
              </Select>
            </FormControl>

            {/* Search filter */}
            <TextField
              id="outlined-search"
              placeholder="Search"
              sx={{ width: "25ch" }}
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
          </Stack>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ fontWeight: "bold", width: "200px" }}>Name</Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>
                    Organization
                  </Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>Memo</Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>Amount</Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>Status</Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>
                    Location
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>
                    Department
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "150px" }}>
                    Request Date
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "150px" }}>
                    Payment Date
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>
                    Delivery
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>Card</Box>
                </TableCell>

                <TableCell align="left">
                  <Box sx={{ fontWeight: "bold", width: "100px" }}>Type</Box>
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ fontWeight: "bold", width: "200px" }}>Action</Box>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell align="right">
                    <CircularProgress size="2rem" />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.data.length ? (
                    <>
                      {filteredData?.map((row: any, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.customerName}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            Org.
                          </TableCell>

                          <TableCell component="th" scope="row">
                            Memo
                          </TableCell>

                          <TableCell align="left">
                            {row.transactionAmount}
                          </TableCell>

                          <TableCell align="left">
                            {row.approvalResultNumber}
                          </TableCell>

                          <TableCell align="left">Loc.</TableCell>

                          <TableCell align="left">Department</TableCell>

                          <TableCell align="left">Request Date</TableCell>

                          <TableCell align="left">
                            {moment(row.transactionDate).format(
                              "DD/MM/YYYY, h:mm a"
                            )}
                          </TableCell>

                          <TableCell align="left">Delivery</TableCell>

                          <TableCell align="left">******4242</TableCell>

                          <TableCell align="left">
                            {row.transactionType}
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="info"
                              sx={{ mr: 2 }}
                            >
                              Re-Send
                            </Button>

                            <Button variant="outlined" color="error">
                              Void
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>
                        <Typography
                          color="primary"
                          sx={{ textAlign: "center" }}
                        >
                          <div style={{ width: "150px" }}>No record found</div>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <Box display="flex" alignItems="center" justifyContent="end">
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            count={data?.rowCount || 0}
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
        </Box>
      </Container>
    </>
  );
};

export default Transaction;
