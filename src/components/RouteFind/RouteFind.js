import { useState, useEffect } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

const RouteFind = ({ routes, setFilteredRoutes }) => {
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");

  const filterRoute = routes.filter(
    (route) =>
      (route.arriveStation.toLowerCase() === arrivalStation ||
        route.departStation.toLowerCase() === arrivalStation ||
        route.middleStations.some(
          (station) => station.title.toLowerCase() === arrivalStation
        )) &&
      (route.arriveStation.toLowerCase() === departureStation ||
        route.departStation.toLowerCase() === departureStation ||
        route.middleStations.some(
          (station) => station.title.toLowerCase() === departureStation
        ))
  );

  useEffect(() => {
    if (arrivalStation.length === 0 || departureStation.length === 0) {
      setFilteredRoutes(routes);
    }
  }, [departureStation, arrivalStation, setFilteredRoutes, routes]);

  const findRouteHandler = () => {
    arrivalStation.length > 0 || departureStation.length > 0
      ? setFilteredRoutes(filterRoute)
      : setFilteredRoutes(routes);
  };

  return (
    <Box sx={{ mt: 40 }}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          sx={{
            height: "55px",
            width: "307px",
            mx: 5,
            backgroundColor: "#e9e9e9",
          }}
          variant="outlined"
          width="300px"
          type="text"
          label="Departure Station"
          value={departureStation}
          onChange={(e) => setDepartureStation(e.target.value.toLowerCase())}
        ></TextField>

        <TextField
          sx={{ height: "55px", width: "307px", backgroundColor: "#e9e9e9" }}
          size="large"
          variant="outlined"
          width="300px"
          value={arrivalStation}
          label="Arrival Station"
          onChange={(e) => setArrivalStation(e.target.value.toLowerCase())}
        ></TextField>

        <Button
          sx={{ height: "55px", width: "307px", mx: 5 }}
          variant="contained"
          size="large"
          color="success"
          type="submit"
          onClick={() => findRouteHandler()}
          className="form__ButtonFindRoute"
        >
          Find route
        </Button>
      </FormControl>
    </Box>
  );
};

export default RouteFind;
