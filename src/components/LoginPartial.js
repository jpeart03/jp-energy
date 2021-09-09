import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle, CompareArrows, Close } from "@material-ui/icons";
import { useAuth } from "../contexts/AuthContext";

const LoginPartial = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { authLoading, currentUser, login, logout } = useAuth();
  const history = useHistory();
  const open = Boolean(anchorEl);
  const iconMargin = { marginRight: "0.5rem" };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogIn = async () => {
    try {
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompare = () => history.push("/compare");

  if (authLoading) {
    return <CircularProgress color="primary" size="1.5rem" />;
  } else {
    return (
      <>
        {currentUser ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem disabled>{currentUser.email}</MenuItem>{" "}
              <MenuItem onClick={handleCompare}>
                <CompareArrows style={iconMargin} /> Compare states
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Close style={iconMargin} />
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogIn}>
            Log in
          </Button>
        )}
      </>
    );
  }
};

export default LoginPartial;
