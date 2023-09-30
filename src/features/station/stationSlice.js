import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stations: [
    {
      id: 1,
      title: "Kharkiv",
      stopTime: "30 min",
    },
    {
      id: 2,
      title: "Kyiv",
      stopTime: "30 min",
    },
    {
      id: 3,
      title: "Poltava",
      stopTime: "20 min",
    },
    {
      id: 4,
      title: "Mirgorod",
      stopTime: "10 min",
    },
    {
      id: 5,
      title: "Lviv",
      stopTime: "30 min",
    },
    {
      id: 6,
      title: "Svyatoshino",
      stopTime: "10 min",
    },
    {
      id: 7,
      title: "Podzamche",
      stopTime: "10 min",
    },
    {
      id: 8,
      title: "Dnepr",
      stopTime: "30 min",
    },
    {
      id: 9,
      title: "Odessa",
      stopTime: "30 min",
    },
    {
      id: 10,
      title: "Rivne",
      stopTime: "20 min",
    },
    {
      id: 11,
      title: "Chernihiv",
      stopTime: "20 min",
    },
  ],
};

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    addStation: (state, action) => {
      state.stations.push(action.payload);
    },
    removeStation: (state, action) => {
      state.stations = state.stations.filter(
        (station) => station.id !== action.payload
      );
    },
  },
});

export const { addStation, removeStation } = stationSlice.actions;
export default stationSlice.reducer;
