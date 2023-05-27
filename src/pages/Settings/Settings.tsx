import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ISettingsForm } from "../../types/types";
import {
  useGetDealerSettingsQuery,
  useAddSettingsMutation,
} from "../../services/API/settingsApiSlice";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmergePaySubmitted } from "../../DmsTrigger";
import { useParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const Settings = () => {
  const classes = useStyles();

  const { dealerId } = useParams();
  const dealerIdNum = parseInt(dealerId || "");

  const [settings, setSettings] = useState<ISettingsForm>({
    DealerId: null,
    Oid: "",
    AuthToken: "",
    SecretPhrase: "",
    AllowTextToPay: false,
    IsSandbox: false,
    AllowGiftCards: false,
    MerchantName: "",
    MerchantKey: "",
  });

  const { data, refetch, error } = useGetDealerSettingsQuery(
    dealerIdNum.toString()
  );

  const handleErrorStatus = (error as FetchBaseQueryError)?.status;

  const [addSettings, { isLoading }] = useAddSettingsMutation();

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      DealerId: dealerIdNum,
    }));
  }, []);

  useEffect(() => {
    // Reset form fields if error status is 404
    if (handleErrorStatus === 404) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        Oid: "",
        AuthToken: "",
        IsSandbox: false,
        AllowTextToPay: false,
        SecretPhrase: "",
        AllowGiftCards: false,
        MerchantName: "",
        MerchantKey: "",
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        Oid: data?.oid || "",
        AuthToken: data?.authToken || "",
        IsSandbox: data?.isSandbox || false,
        AllowTextToPay: data?.allowTextToPay || false,
        SecretPhrase: data?.secretPhrase || "",
        AllowGiftCards: data?.allowGiftCards || false,
        MerchantName: data?.merchantName || "",
        MerchantKey: data?.merchantKey || "",
      }));
    }
  }, [data, handleErrorStatus]);

  //-------------------- Handlers --------------------//
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addSettings(settings);
    if (localStorage.getItem("Login_Source")?.toString() === "DMS_IDEAL") {
      EmergePaySubmitted(settings);
    } else {
      // reset form state
      setSettings((prevSettings) => ({
        ...prevSettings,
        Oid: "",
        AuthToken: "",
        IsSandbox: false,
        AllowTextToPay: false,
        SecretPhrase: "",
        AllowGiftCards: false,
        MerchantName: "",
        MerchantKey: "",
      }));

      // fetch data after submit
      refetch();
    }
  };

  return (
    <>
      <Helmet>
        <title> Settings </title>
      </Helmet>

      <Grid container style={{ padding: "20px" }}>
        {/* Left Empty Grid */}
        <Grid item md={3} xs={12} />

        {/* Center Grid */}
        <Grid item md={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                EmergePay Settings
              </Typography>
            </Grid>

            <Grid item xs={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Oid"
                name="Oid"
                required
                value={settings.Oid}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Auth Token"
                name="AuthToken"
                required
                value={settings.AuthToken}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Secret Phrase"
                name="SecretPhrase"
                required
                value={settings.SecretPhrase}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />
            </Grid>

            {/* ------------------------------------------- */}

            <Grid item xs={12} style={{ marginBottom: "5px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.AllowTextToPay}
                    onChange={handleCheckBox}
                    name="AllowTextToPay"
                  />
                }
                label="Allow Text-To-Pay"
              />
            </Grid>

            <hr />

            <Grid item xs={12} style={{ marginBottom: "5px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.AllowGiftCards}
                    onChange={handleCheckBox}
                    name="AllowGiftCards"
                  />
                }
                label="Allow Gift Cards"
              />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Merchant Name"
                name="MerchantName"
                value={settings.MerchantName}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Merchant Key"
                name="MerchantKey"
                value={settings.MerchantKey}
                onChange={handleChange}
                size="small"
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </form>
        </Grid>

        {/* Right Empty Grid */}
        <Grid item md={3} xs={12} />
      </Grid>
    </>
  );
};

export default Settings;

const useStyles = makeStyles(() => ({
  mb: {
    marginBottom: "50px",
  },
}));
