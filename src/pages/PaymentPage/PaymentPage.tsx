import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Container } from "@mui/material";

declare const emergepayUrlPage: any;

const PaymentPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    async function loadScriptAsync() {
      const script = document.createElement("script");
      script.src =
        urlParams.get("isSandbox") === "true"
          ? "https://assets.emergepay-sandbox.chargeitpro.com/cip-hosted-url.js"
          : "https://assets.emergepay.chargeitpro.com/cip-hosted-url.js";

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }

    loadScriptAsync();
  }, []);

  useEffect(() => {
    async function StartTransaction() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // add delay for script to load

      const transactionToken = urlParams.get("transactionToken");

      const iframe = document.createElement("iframe");
      iframe.id = "cip-hosted-urlpage";
      iframe.style.display = "none";
      iframe.classList.add("iframeStyles");
      document.getElementById("iframeDiv")?.appendChild(iframe);

      const urlPage = emergepayUrlPage.init({
        onTransactionSuccess: function (approvalData: any) {
          console.log("Approval Data", approvalData);
          postCallbackResponse("true", approvalData);
        },
        onTransactionFailure: function (failureData: any) {
          console.log("Failure Data", failureData);
          postCallbackResponse("false", failureData);
        },
      });

      iframe.src = urlPage.getUrl(transactionToken);
      iframe.style.display = "block";

      const container = document.querySelector(
        ".iframeContainer"
      ) as HTMLElement;
      if (container) {
        container.style.display = "block";
      }
    }

    function postCallbackResponse(approved: string, callbackResponse: any) {
      window.postMessage(
        {
          isApproved: approved,
          transactionResponse: callbackResponse,
        },
        "*"
      );
    }

    StartTransaction();
  }, []);

  return (
    <>
      <Helmet>
        <title> Payment Page </title>
      </Helmet>

      <Container>
        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          <div className="iframeContainer">
            <div id="iframeDiv"></div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default PaymentPage;
