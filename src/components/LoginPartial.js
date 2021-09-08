import { useState } from "react";
import {
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useAuth } from "../contexts/AuthContext";

const LoginPartial = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const open = Boolean(anchorEl);
    const { login, logout, currentUser } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogIn = async () => {
        setLoading(true);
        try {
            await login();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleLogOut = async () => {
        setLoading(true);
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    if (loading) {
        return <CircularProgress color="secondary" size="1.5rem" />;
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
                            <MenuItem disabled>{currentUser.email}</MenuItem>
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
