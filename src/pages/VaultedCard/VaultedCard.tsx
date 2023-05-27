import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetVaultCardQuery } from "../../services/API/vaultedCardApiSlice";

const VaultedCard = () => {
  const { data, isFetching } = useGetVaultCardQuery({
    dealerId: Number(localStorage.getItem("dealerId")),
    customerId: 1001, // hardCoded Id
  });

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Box mb={5}>
          <Typography variant="h6" gutterBottom>
            Vaulted Card
          </Typography>
        </Box>

        <Paper
          elevation={1}
          sx={{
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <Stack direction={"row"}>
            <Typography mr={3}> Customer Name:</Typography>
            <Typography>John Doe</Typography>
          </Stack>
        </Paper>

        <Grid container spacing={4} mb={3}>
          {isFetching ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", height: "40vh" }}
            >
              <CircularProgress size="2rem" />
            </Box>
          ) : (
            <>
              {data?.vaultedCards.map((item, index) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    key={index}
                    sx={{
                      p: 4,
                      boxShadow: 0,
                      borderRadius: "10px",
                      color: "#061b64",
                      bgcolor: "#d1e9fc",
                    }}
                  >
                    <Box display="flex" justifyContent="end">
                      <DeveloperBoardIcon fontSize="large" />
                    </Box>

                    <hr style={{ borderTop: "1px solid #061b64" }} />

                    <Stack direction={"row"} mt={2}>
                      <Typography variant="h6" mr={2} sx={{ opacity: 0.72 }}>
                        Card Number:
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.72 }}>
                        {item.cardNumber}
                      </Typography>
                    </Stack>

                    <Stack direction={"row"} mt={1}>
                      <Typography variant="h6" mr={2} sx={{ opacity: 0.72 }}>
                        Type:
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.72 }}>
                        {item.cardType}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </>
          )}

          <Grid item display="flex" justifyContent="end" xs={12} mt={8}>
            <Button variant="outlined" sx={{ marginRight: "20px" }}>
              Process Payment
            </Button>
            <Button variant="outlined">Add New</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VaultedCard;
