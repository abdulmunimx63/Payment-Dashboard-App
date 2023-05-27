import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Box, Container } from "@mui/material";
import { toast } from "react-toastify";

type JWTDeCode = {
  exp: number;
};

const Redirect = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Redirecting...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    // const accessToken =
    //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IkVFMzI5NkQ2RUQ3N0YyNTBERDhGREQ5QjFGN0FEMjFFQTMwMzUxQTBSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjdqS1cxdTEzOGxEZGo5MmJIM3JTSHFNRFVhQSJ9.eyJuYmYiOjE2ODExMzEwODIsImV4cCI6MTY4MTEzMTY4MiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eW1hbmFnZW1lbnRxYS5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IlRhcmdldENSTSIsImNsaWVudF9pZCI6IlRhcmdldENSTSIsInN1YiI6ImE4MTczNjQzLWM5MWYtZWMxMS05ODFmLTI4MTg3ODljMzQyMCIsImF1dGhfdGltZSI6MTY4MTEzMTA4MiwiaWRwIjoibG9jYWwiLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsIm5hbWUiOiJjaHJpcyIsImdpdmVuX25hbWUiOiJDaHJpcyBSYW1pcmV6IiwiZW1haWwiOiJjaHJpc0BnbWFpbC5jb20iLCJwcm9maWxlIjoie1wiZGVhbGVySWRcIjoxMjQyNSxcInVzZXJJZFwiOjE0NixcImRtc0RlYWxlcklkXCI6OTk5MDAyfSIsImp0aSI6IjNENEVCNUIzREY1NjkzMEU4N0E3MERCQURDQTBEOTM5IiwiaWF0IjoxNjgxMTMxMDgyLCJzY29wZSI6WyJUYXJnZXRDUk0iLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.VoN-bMRv3ahA9eu6K2BkoyTpjIlyVEkhFyKBZ-_lRzhYOWRHjcPNj2opSyAHMwUl516RYK0WjIX2iXxxh6pRE37F_SbVQrStoWy54L-oqwMpVqhYBKc0EGaf8JY5iov9Lsy1UfGCHt_5Zclv1LOxHoUAvAFft7O0FFY3HyhLKLjns9i1J8EDHLX5rcQ_qDN7nkPrXq0uuEh66GkJllgsaGr2cRnPvrYqljh00mTz-4dQg9mBPiBuSiN7OVfpqB35ubABAQSkt_FWgN7SWZnnOqaabNzvdhcimfszsHPSJdMUySnVwf9qij4LZaJzxEG5XzOG9efeB6OJNKFXa7v";

    // Validating Access_Token
    if (accessToken) {
      const decodedJwt: JWTDeCode = jwt_decode(accessToken);
      let currentDate = new Date();
      if (decodedJwt.exp * 1000 <= currentDate.getTime()) {
        // Invalid token
        setTitle("Access token is expired!");
        localStorage.clear();
        toast.error("Access token expired...", {
          toastId: 101,
        });
      } else {
        // Token is valid
        localStorage.clear();
        localStorage.setItem("access_token", accessToken);
        toast.info("Redirecting, please wait...", {
          toastId: 102,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 4000);
      }
    }
  }, []);

  return (
    <Container>
      <Box
        component="main"
        height="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2>{title}</h2>
        {title === "Redirecting..." ? (
          <h6>Please wait</h6>
        ) : (
          <h6>Please try again with valid token</h6>
        )}
      </Box>
    </Container>
  );
};

export default Redirect;
