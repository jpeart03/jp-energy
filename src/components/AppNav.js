import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appLogIn, appLogOut } from "../api/firebase";

import LoginPartial from "./LoginPartial";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const AppNav = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const auth = getAuth();
    const classes = useStyles();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            setAuthLoading(false);
        } else {
            setUser(null);
            setAuthLoading(false);
        }
    });

    const handleLogIn = () => {
        setAuthLoading(true);
        appLogIn();
    };

    const handleLogOut = () => {
        setAuthLoading(true);
        appLogOut();
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Lightsource
                    </Typography>
                    <LoginPartial
                        user={user}
                        loading={authLoading}
                        handleLogIn={handleLogIn}
                        handleLogOut={handleLogOut}
                    />
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default AppNav;
