import RouteDescription from "../RouteDescription/RouteDescription";
import { useState } from "react";
import {
  Card,
  CardActionArea,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import { AccessTime, TrendingFlat } from "@mui/icons-material";

const RouteItem = ({ route }) => {
  const [showRootDescription, setRootDescription] = useState(false);

  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        p: 2,
        textAlign: "center",
        backgroundColor: "#e6eaf0",
        maxWidth: 1000,
        height: "100px",
        m: "0 auto",
        my: 2,
      }}
    >
      <CardActionArea sx={{ display: "flex", cursor: "pointer", my: 2 }}>
        <Typography sx={{ alignItems: "start", color: "green" }}>
          Route # {route.numRoute}
        </Typography>

        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography>
            {route.departStation} <TrendingFlat />
          </Typography>
          <Typography>
            <AccessTime /> {route.departTime}
          </Typography>
        </CardContent>

        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography>
            <TrendingFlat /> {route.arriveStation}
          </Typography>
          <Typography>
            <AccessTime /> {route.arriveTime}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div>
        <Button
          onClick={() => setRootDescription(true)}
          sx={{
            cursor: "pointer",
            justifyContent: "center",
            my: 2,
            alignItems: "center",
          }}
          variant="outlined"
        >
          Description
        </Button>
        {showRootDescription && (
          <RouteDescription
            active={showRootDescription}
            close={setRootDescription}
            route={route}
          />
        )}
      </div>
    </Card>
  );
};

export default RouteItem;
