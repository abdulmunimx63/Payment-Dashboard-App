import { useState } from "react";
import "rsuite/dist/rsuite.css";
import DateRangePicker from "rsuite/DateRangePicker";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { useGetDashboardDataQuery } from "../../services/API/dashboardApiSlice";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TableHead,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  format,
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

const DashboardApp = () => {
  const [transactionType, setTransactionType] = useState<string>("");
  const [isRemotePayments, setIsRemotePayments] = useState(false);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    startOfDay(subDays(new Date(), 6)),
    endOfDay(new Date()),
  ]);

  const dealerId = useAppSelector((state: RootState) => state.dealer.dealerId);

  //! Data Fetching
  const { data, isFetching } = useGetDashboardDataQuery({
    dealerId,
    isRemotePayments,
    fromDate: format(dateRange[0], "yyyy-MM-dd"),
    toDate: format(dateRange[1], "yyyy-MM-dd"),
    transactionType,
  });

  // ----------------------- HANDLERS ---------------------------//
  const handleDateValueChange = (value: [Date, Date] | null) => {
    if (value) {
      setDateRange(value);
    }
  };

  const handleClose = () => {
    setDateRange([startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemotePayments(event.target.checked);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h6" gutterBottom>
            Dashboard
          </Typography>

          {/***** Filter Section *****/}
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Remote Payment */}
            <Stack direction={"row"} alignItems="center" mr={4}>
              <Typography variant="body2">Remote Payments</Typography>

              <Switch
                checked={isRemotePayments}
                onChange={handleSwitchChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Stack>

            {/* Date range filter */}
            <Stack direction="row" alignItems="center" mr={4}>
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
            </Stack>

            {/* Transaction Type Filter */}
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">Transaction Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transactionType}
                label="Transaction Type"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value="">--</MenuItem>
                <MenuItem value={"CreditSale"}>Credit Sale</MenuItem>
                <MenuItem value={"CreditReturn"}>Credit Return</MenuItem>
                <MenuItem value={"CreditAuth"}>Credit Auth</MenuItem>
                <MenuItem value={"CreditSaveCard"}>Credit Save Card</MenuItem>
                <MenuItem value={"RequestSignature"}>
                  Request Signature
                </MenuItem>
                <MenuItem value={"TokenizedPayment"}>
                  Tokenized Payment
                </MenuItem>
                <MenuItem value={"TokenizedRefund"}>Tokenized Refund</MenuItem>
                <MenuItem value={"TokenizedAuth"}>Tokenized Auth</MenuItem>
                <MenuItem value={"TokenizedForce"}>Tokenized Force</MenuItem>
                <MenuItem value={"VoidTransaction"}>Void Transaction</MenuItem>
                <MenuItem value={"RetrieveTransaction"}>
                  Retrieve Transaction
                </MenuItem>
                <MenuItem value={"RemotePayment"}>Remote Payment</MenuItem>
                <MenuItem value={"CancelPaymentLink"}>
                  Cancel Payment Link
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Grid container spacing={4} mb={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                borderRadius: "10px",
                textAlign: "center",
                color: "#061b64",
                bgcolor: "#d1e9fc",
              }}
            >
              <Typography variant="h3" sx={{ opacity: 0.72 }}>
                ${data?.totalAmountProcessed}
              </Typography>

              <Typography variant="subtitle1" mb={2}>
                Total Amount Processed
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                borderRadius: "10px",
                textAlign: "center",
                color: "#04297a",
                bgcolor: "#d0f2ff",
              }}
            >
              <Typography variant="h3" sx={{ opacity: 0.72 }}>
                {data?.totalApprovedTransactions == null
                  ? 0
                  : data?.totalApprovedTransactions}
              </Typography>

              <Typography variant="subtitle1" mb={2}>
                Total Approved Transactions
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                borderRadius: "10px",
                textAlign: "center",
                color: " #7a4f01",
                bgcolor: "#fff7cd",
              }}
            >
              <Typography variant="h3" sx={{ opacity: 0.72 }}>
                8
              </Typography>

              <Typography variant="subtitle1" mb={2}>
                Transaction Count
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="body1" mb={2} color="primary">
          Recent Transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", width: "200px" }}
                >
                  Date
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Approval
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Type
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Card
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="right">
                    <CircularProgress size="2rem" />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.transactions.data.length ? (
                    <>
                      {data?.transactions.data.map((row: any, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.customerName}
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="left">
                            {moment(row.transactionDate).format(
                              "DD/MM/YYYY, h:mm a"
                            )}
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="left">
                            {row.approvalResultNumber}
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="left">
                            {row.transactionType}
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="left">
                            {row.transactionAmount}
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="left">
                            ******4242
                          </TableCell>

                          <TableCell style={{ width: 160 }} align="center">
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
                      <TableCell>
                        <Typography
                          color="primary"
                          sx={{ textAlign: "center" }}
                        >
                          No record found in this date range
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default DashboardApp;
