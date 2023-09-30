import { Box, Typography } from "@mui/material";
import RouteItem from "../RouteItem/RouteItem";

const RoutesList = ({ routes }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {routes.length ? (
        routes.map((route) => <RouteItem key={route.id} route={route} />)
      ) : (
        <Typography variant="button" color="error" align="center">
          No routes found
        </Typography>
      )}
    </Box>
  );
};

export default RoutesList;
