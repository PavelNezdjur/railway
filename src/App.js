import Header from "./components/Header/Header";
import StationsList from "./components/StationsList/StationList";
import RoutesList from "./components/RoutesList/RoutesList";
import RouteFind from "./components/RouteFind/RouteFind";
import RouteAddForm from "./components/RouteAddForm/RouteAddForm";
import schedule from "../src/images/Schedule3.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./App.css";
import { Container } from "@mui/material";

function App() {
  const stations = useSelector((state) => state.station.stations);
  const routes = useSelector((state) => state.route.routes);

  const [showRouteForm, setShowRouteForm] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);


  useEffect(() => {
    setFilteredRoutes(routes);
  }, [routes]);

  return (
    <>
      <Header setShowRouteForm={setShowRouteForm} />
      <Container
        sx={{
          mt: "0",
          backgroundImage: `url(${schedule})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <StationsList stations={stations} />
        <RouteFind routes={routes} setFilteredRoutes={setFilteredRoutes} />
        <RoutesList routes={filteredRoutes} />
        {showRouteForm && (
          <RouteAddForm active={showRouteForm} close={setShowRouteForm} />
        )}
        
      </Container>
    </>
  );
}

export default App;
