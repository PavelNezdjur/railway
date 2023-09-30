import { configureStore } from "@reduxjs/toolkit";
import stationSlice from "../features/station/stationSlice";
import routeSlice from "../features/route/routeSlice"

export const store = configureStore ({
   reducer: {
      station: stationSlice,
      route: routeSlice
   }
})