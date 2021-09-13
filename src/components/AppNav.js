import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import LoginPartial from "./LoginPartial";
import "./AppNav.scss";

const AppNav = () => {
  return (
    <div className="nav">
      <AppBar position="fixed" color="inherit">
        <Toolbar className="nav">
          <Box className="nav-brand">
            <WbIncandescentIcon color="primary" />
            <Typography variant="h6">
              <Link to="/">Lightsource</Link>
            </Typography>
          </Box>
          <LoginPartial />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNav;
