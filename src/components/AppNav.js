import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LoginPartial from "./LoginPartial";
import "./AppNav.scss";

const AppNav = () => {
  return (
    <div className="nav">
      <AppBar position="fixed" color="inherit">
        <Toolbar className="nav">
          <Typography variant="h6" className="nav-link">
            <Link to="/">Lightsource</Link>
          </Typography>
          <LoginPartial />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNav;
