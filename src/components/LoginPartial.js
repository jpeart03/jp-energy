import { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const LoginPartial = ({ user, loading, handleLogIn, handleLogOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <CircularProgress color="secondary" size="1.5rem" />;
  } else {
    return (
      <>
        {user ? (
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
              <MenuItem disabled>{user.email}</MenuItem>
              <MenuItem onClick={handleLogOut}>Log out</MenuItem>
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
