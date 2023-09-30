import { useDispatch } from "react-redux";
import { removeStation } from "../../features/station/stationSlice";
import { Button, Card, CardActions, Grid, Typography } from "@mui/material";
import { DeleteOutline, Timer } from "@mui/icons-material";

const StationItem = ({ station }) => {
  const dispatch = useDispatch();
  const removeStationHandler = (id) => dispatch(removeStation(id));

  return (
    <Grid item xs={5} md={2}>
      <Card
        elevation={3}
        sx={{
          mt: 2,
          textAlign: "center",
          backgroundColor: "#e9e9e9",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{station.title}</Typography>
        <Typography color="darkgray" variant="subtitle2">
          <Timer size="small" /> {station.stopTime}
        </Typography>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => removeStationHandler(station.id)}
            sx={{ cursor: "pointer" }}
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteOutline />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StationItem;
