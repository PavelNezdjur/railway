
import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  routes: [
    {
      id: 5,
      numRoute: 63,
      departStation: "Kharkiv",
      departTime: "22:45",
      arriveStation: "Kyiv",
      arriveTime: "05:40",
      middleStations: [
        {
          id: v4(),
          title: "Poltava",
          stopTime: "20 min",
          departTime: "01:20",
        },
        {
          id: v4(),
          title: "Mirgorod",
          stopTime: "10 min",
          departTime: "02:50",
        },
      ],
      tickets: [
        {
          id: v4(),
          carriageType: "Reserved Seat",
          ticketsTotal: 45,
          ticketPrice: 500,
        },
        {
          id: v4(),
          carriageType: "Coupe",
          ticketsTotal: 40,
          ticketPrice: 1000,
        },
      ],
    },
    {
      id: 7,
      numRoute: 91,
      departStation: "Kyiv",
      departTime: "22:50",
      arriveStation: "Lviv",
      arriveTime: "06:20",
      middleStations: [
        {
          id: v4(),
          title: "Svyatoshino",
          stopTime: "10 min",
          departTime: "23:20",
        },
        {
          id: v4(),
          title: "Podzamche",
          stopTime: "10 min",
          departTime: "06:10",
        },
      ],
      tickets: [
        {
          id: v4(),
          carriageType: "Reserved Seat",
          ticketsTotal: 45,
          ticketPrice: 570,
        },
        {
          id: v4(),
          carriageType: "Coupe",
          ticketsTotal: 40,
          ticketPrice: 1200,
        },
      ],
    },
  ],
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    addRoute: (state, action) => {
      state.routes.push(action.payload);
    },
    removeRoute: (state, action) => {
      state.routes = state.routes.filter(
        (route) => route.id !== action.payload
      );
    },
    editRoute: (state, action) => {
      // const routeEdit = state.routes.find(route => route.id === action.payload.id)
      // Object.assign(routeEdit, action.payload)

      state.routes.map((route) => {
        if (route.id === action.payload.id ) { Object.assign(route, action.payload) }
      })
      },
  },
});

export const { addRoute, removeRoute, editRoute } = routeSlice.actions;
export default routeSlice.reducer;
