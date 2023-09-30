import { removeRoute } from "../../features/route/routeSlice";
import RouteEditForm from "../RouteEditForm/RouteEditForm";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleRightOutlined,
  ClearOutlined,
  DeleteTwoTone,
  Edit,
} from "@mui/icons-material";

const RouteDescription = ({ route, active, close }) => {
  const dispatch = useDispatch();

  const [showRouteEditForm, setShowRouteEditForm] = useState(false);

  const removeRouteHandler = (id) => dispatch(removeRoute(id));

  return (
    <Modal open={active}>
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gridAutoFlow: "column",
          overflowY: "auto",
          height: 450,
          p: 2,
          textAlign: "center",
          backgroundColor: "aliceblue",
          maxWidth: 1000,
          m: "0 auto",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "lightgray",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          <Typography sx={{ alignItems: "start", color: "#d32f2f" }}>
            Route # {route.numRoute}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => close(false)}
            color="error"
            size="small"
          >
            <ClearOutlined /> Close
          </Button>
        </CardContent>
        <CardActionArea component="span" sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="button" fontSize={16}>
              {route.departStation} <ArrowCircleRightOutlined />
            </Typography>
            <Typography>Departure: {route.departTime}</Typography>
          </CardContent>

          <List sx={{ width: "100%", maxWidth: 350 }}>
            {route.middleStations?.map((midStation) => (
              <ListItem key={midStation.id} sx={{ justifyContent: "center" }}>
                <Typography m={2} variant="button">
                  <ArrowCircleDown />
                  {midStation.title}
                </Typography>
                <Typography variant="overline" sx={{ lineHeight: "1.6" }}>
                  Stopped time: {midStation.stopTime}
                  <br />
                  Departure time: {midStation.departTime}
                  <br />
                </Typography>
              </ListItem>
            ))}
          </List>

          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="button" fontSize={16}>
              <ArrowCircleRightOutlined /> {route.arriveStation}
            </Typography>
            <Typography>Arrival: {route.arriveTime}</Typography>
          </CardContent>
        </CardActionArea>

        <List
          sx={{
            display: "flex",
            border: "1px solid black",
            backgroundColor: "lightgray",
            borderRadius: "5px",
          }}
        >
          {route.tickets?.map((ticket) => (
            <ListItem
              key={ticket.id}
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Typography variant="overline" sx={{ lineHeight: "1.6" }}>
                {ticket.carriageType}: {ticket.ticketsTotal} items
                <br />
                Price: {ticket.ticketPrice} UAH
              </Typography>
            </ListItem>
          ))}
        </List>

        <Button
          onClick={() => setShowRouteEditForm(true)}
          color="warning"
          size="small"
          sx={{ mt: 2 }}
        >
          <Edit />
          Edit Route
        </Button>

        <Button
          onClick={() => removeRouteHandler(route.id)}
          color="error"
          size="small"
          sx={{ mt: 2 }}
        >
          <DeleteTwoTone />
          Delete Route
        </Button>

        {showRouteEditForm && (
          <RouteEditForm
            route={route}
            active={showRouteEditForm}
            close={setShowRouteEditForm}
          />
        )}
      </Card>
    </Modal>
  );
};

export default RouteDescription;
