import StationItem from "../StationItem/StationItem";
import StationForm from "../StationForm/StationForm";
import { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import { AddCircleOutlineTwoTone } from "@mui/icons-material";

const StationsList = ({ stations }) => {
  const [showAllStations, setShowAllStations] = useState(false);
  const [showStationForm, setShowStationForm] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <Button
          sx={{ cursor: "pointer" }}
          variant="outlined"
          onClick={() => setShowAllStations(!showAllStations)}
        >
          {!showAllStations ? "Show list stations" : "Hide list stations"}
        </Button>

        <Button
          onClick={() => setShowStationForm(true)}
          sx={{ cursor: "pointer" }}
          variant="outlined"
          startIcon={<AddCircleOutlineTwoTone />}
        >
          Add new station
        </Button>
        {showStationForm && (
          <StationForm active={showStationForm} close={setShowStationForm} />
        )}
      </Box>

      {showAllStations && (
        <>
          {/* <Typography
            variant="subtitle2"
            sx={{ textAlign: "center", mb: 2, fontSize: 20 }}
          >
            Available stations{" "}
          </Typography> */}
          <Box sx={{ position: 'absolute', width: '1152px' }}>
          <Grid
            container
            spacing={2}
            justifyContent={"space-evenly"}
            sx={{ gridAutoFlow: "column", height: "285px", overflowX: "auto" }}
          >
            {stations?.map((station) => (
              <StationItem key={station.id} station={station} />
            ))}
          </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default StationsList;
