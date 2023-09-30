import { DirectionsRailwayTwoTone } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const Header = ({ setShowRouteForm }) => {
  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Railway Stations
        </Typography>
        <IconButton
          color="inherit"
          fontSize="large"
          onClick={() => setShowRouteForm(true)}
        >
          ADD NEW ROUTE + <DirectionsRailwayTwoTone />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
