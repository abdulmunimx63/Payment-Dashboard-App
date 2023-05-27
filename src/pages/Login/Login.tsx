import Header from "../../layouts/simple/header";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Toolbar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useLoginMutation } from "../../services/API/authApiSlice";
import { AuthRequest } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { getDealerIdFromToken } from "../../helpers/helpers";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<AuthRequest>({
    dmsDealerId: 9999001,
    username: "Frank",
    password: "moose",
    productId: "1a78ff3b-60fe-4e4b-5d53-08d976a4edc9",
    clientId: "TargetCRM",
    clientSecret: "2'XC1&f#Dd8Rt%.)F{ss6?_$`S&cEj",
  });

  const [login, { isLoading }] = useLoginMutation();

  //-------------------- Handlers --------------------//
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login(form)
      .unwrap()
      .then((response) => {
        dispatch(
          setCredentials({
            access_token: response.access_token,
            expires_in: response.expires_in,
            refresh_token: response.refresh_token,
            token_type: response.token_type,
            scope: response.scope,
          })
        );

        // extract dealerId from token and store in localStorage
        const dealerId = getDealerIdFromToken(response.access_token);
        localStorage.clear();
        // localStorage.setItem("dealerId", dealerId);
        localStorage.setItem("access_token", response.access_token);

        toast.success("Logged in successfully");
        // navigate to dashboard
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log("Invalid Userame or Password", error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <Header />
      <Toolbar />
      <Toolbar />

      <Container>
        <Grid container>
          {/* Left Empty Grid */}
          <Grid item xs={12} md={4} />

          {/* Center Grid */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" textAlign={"center"} gutterBottom>
              Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                sx={{ mb: "10px" }}
                label="DMS Dealer Id"
                name="dmsDealerId"
                required
                value={form.dmsDealerId}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />

              <TextField
                fullWidth
                sx={{ mb: "10px" }}
                label="Username"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />

              <TextField
                fullWidth
                sx={{ mb: "15px" }}
                label="Password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                size="small"
                type="password"
                variant="outlined"
              />

              {isLoading ? (
                <Button
                  endIcon={<CircularProgress size="1.5rem" />}
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  Logging in...
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  // disabled={isLoading}
                >
                  Login
                </Button>
              )}
            </form>
          </Grid>

          {/* Right Empty Grid */}
          <Grid item xs={12} md={4} />
        </Grid>
      </Container>
    </>
  );
};

export default Login;
