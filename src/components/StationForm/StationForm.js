import { useDispatch } from "react-redux";
import { addStation } from "../../features/station/stationSlice";
import { v4 } from "uuid";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  DepartureBoard,
  DoneOutline,
} from "@mui/icons-material";
import ImageRWStation from "../../images/RWTrain2.jpg";

const StationForm = ({ active, close }) => {
  const dispatch = useDispatch();
  const [stationTitle, setStationTitle] = useState("");
  const [stationStopTime, setStationStopTime] = useState("10 min");

  const ChangeStopTime = (e) => setStationStopTime(e.target.value);

  const addStationHandler = () => {
    const newStation = {
      id: v4(),
      title: stationTitle,
      stopTime: stationStopTime,
    };
    dispatch(addStation(newStation));
    setStationTitle("");
    close(false);
  };

  return (
    <Modal open={active}>
      <Card
        sx={{
          maxWidth: 400,
          position: "absolute",
          top: "40%",
          left: "55%",
          transform: "translate(-70%, -30%)",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        <div onSubmit={(e) => e.preventDefault()}>
          <CardMedia
            sx={{ height: 140 }}
            image={ImageRWStation}
            title="img station"
          />
          <CardContent component="form">
            <TextField
              type="text"
              value={stationTitle}
              required
              error
              label="New station title"
              onChange={(e) => setStationTitle(e.target.value)}
              size="small"
              fullWidth
            />

            <Typography variant="h6" my={2}>
              <DepartureBoard />
              Train stop time:
            </Typography>

            <label>
              <Radio
                size="small"
                value="10 min"
                checked={stationStopTime === "10 min"}
                onChange={ChangeStopTime}
              />
              10 min
            </label>

            <label>
              <Radio
                size="small"
                value="20 min"
                checked={stationStopTime === "20 min"}
                onChange={ChangeStopTime}
              />
              20 min
            </label>

            <label>
              <Radio
                size="small"
                value="30 min"
                checked={stationStopTime === "30 min"}
                onChange={ChangeStopTime}
              />
              30 min
            </label>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={() => addStationHandler()}
            >
              <DoneOutline />
              Add station
            </Button>
            <Button onClick={() => close(false)} color="error">
              <ClearOutlined />
            </Button>
          </CardActions>
        </div>
      </Card>
    </Modal>
  );
};

export default StationForm;
