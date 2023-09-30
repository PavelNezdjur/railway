import { useDispatch } from "react-redux";
import { editRoute } from "../../features/route/routeSlice";
import { v4 } from "uuid";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import RouteStationAdd from "../RouteAddForm/RouteStationAdd.js/RouteStationAdd";
import RouteNumAdd from "../RouteAddForm/RouteNumAdd/RouteNumAdd.js";
import RouteMiddleStationsAdd from "../RouteAddForm/RouteMiddleStationsAdd/RouteMiddleStationsAdd.js";
import RouteTicketsAdd from "../RouteAddForm/RouteTicketsAdd/RouteTicketsAdd.js";
import { Box, Button, Card, Modal } from "@mui/material";
import { ClearOutlined } from "@mui/icons-material";
import RouteAdd from "../../images/RouteAdd.jpg";
import { DevTool } from "@hookform/devtools";

const RouteEditForm = ({ route, active, close }) => {
  const dispatch = useDispatch();
  console.log("пришел route ", route);
  const methods = useForm({
    mode: "onChange",

    defaultValues: {
      id: route.id,
      numRoute: route.numRoute,
      departStation: route.departStation,
      departTime: route.departTime,
      arriveStation: route.arriveStation,
      arriveTime: route.arriveTime,

      middleStations: route.middleStations.map((station) => ({
        id: station.id,
        title: station.title,
        stopTime: station.stopTime,
        departTime: station.departTime,
      })),

      tickets: route.tickets.map((ticket) => ({
        id: ticket.id,
        carriageType: ticket.carriageType,
        ticketsTotal: ticket.ticketsTotal,
        ticketPrice: ticket.ticketPrice,
      })),
    },
  });

  const { handleSubmit, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "middleStations",
    control: control,
  });

  const {
    fields: fieldTicket,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    name: "tickets",
    control: control,
  });

  const onSubmit = (data) => {
    console.log("получены: data ", data);

    const newRoute = {
      id: route.id,
      numRoute: data.numRoute,
      departStation: data.departStation.value || data.departStation,
      departTime: data.departTime,
      arriveStation: data.arriveStation.value || data.arriveStation,
      arriveTime: data.arriveTime,

      middleStations: data.middleStations.map((station) => ({
        id: v4(),
        title: station.value || station.title,
        stopTime: station.stopTime,
        departTime: station.departMidStTime,
      })),

      tickets: data.tickets.map((ticket) => ({
        id: v4(),
        carriageType: ticket.carriageType || ticket.value,
        ticketsTotal: ticket.ticketsTotal,
        ticketPrice: ticket.ticketPrice,
      })),
    };

    console.log("newRoute", newRoute);
    dispatch(editRoute(newRoute));
    reset();
    close(false);
  };

  return (
    <Modal open={active}>
      <Card
        sx={{
          gridAutoFlow: "column",
          overflowY: "auto",
          maxWidth: 800,
          height: 579,
          backgroundImage: `url(${RouteAdd})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "30%",
          left: "58%",
          transform: "translate(-70%, -30%)",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RouteNumAdd />

            <RouteStationAdd
              sx={{ mb: 1 }}
              typeStation="departStation"
              placeholderStation="Departure Station"
              typeTime="departTime"
              placeholderTime="Departure Time"
            />

            <RouteStationAdd
              typeStation="arriveStation"
              placeholderStation="Arrival Station"
              typeTime="arriveTime"
              placeholderTime="Arrival Time"
            />

            {fields?.map((field, index) => (
              <RouteMiddleStationsAdd
                field={field}
                key={field.id}
                index={index}
                remove={remove}
              />
            ))}
            <Button
              sx={{ mb: 1 }}
              type="button"
              onClick={() => {
                append("middleStations");
              }}
            >
              Add Middle Station
            </Button>

            {fieldTicket?.map((field, index) => (
              <RouteTicketsAdd
                key={field.id}
                index={index}
                field={field}
                remove={removeTicket}
              />
            ))}
            <Button
              type="button"
              onClick={() => {
                appendTicket();
              }}
            >
              Add tickets another type
            </Button>
            <br />
            <Box display="flex" justifyContent="space-evenly" sx={{ mt: 7 }}>
              <Button type="submit" color="success" variant="contained">
                Edit route
              </Button>
              <Button onClick={() => close(false)} color="error">
                <ClearOutlined /> close
              </Button>
            </Box>
          </form>
          <DevTool control={control} placement="top-right" />
        </FormProvider>
      </Card>
    </Modal>
  );
};

export default RouteEditForm;
