import { useState, useEffect } from "react";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setDealerId } from "../../features/dealer/dealerSlice";

const DealerLocationSearch = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState([] as any);

  const dealerId = useAppSelector((state: RootState) => state.dealer.dealerId);
  const token = useAppSelector((state: RootState) => state.auth.access_token);

  const baseUrl = process.env.REACT_APP_BASE_URL || "";

  // Fetch Dealer Locations
  useEffect(() => {
    const fetchDealerLocations = async () => {
      try {
        const response = await fetch(`${baseUrl}Dealer/DealerLocations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOptions(data.locations);

        // Set the first option as the default value
        if (data.locations.length > 0) {
          dispatch(setDealerId(data.locations[0].dealerId));
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchDealerLocations();
  }, []);

  // handlers
  const handleChange = (event: any) => {
    dispatch(setDealerId(event.target.value as string));
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography variant="body2" gutterBottom>
          DMS Location Id
        </Typography>
        <Select
          size="small"
          sx={{ m: 1, minWidth: 200, background: "white" }}
          value={dealerId}
          onChange={handleChange}
        >
          {options?.map((option: any) => (
            <MenuItem key={option.dmsLocationId} value={option.dealerId}>
              {option.dmsLocationId} - {option.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default DealerLocationSearch;
