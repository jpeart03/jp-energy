import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import LoginPartial from "./LoginPartial";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const AppNav = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Lightsource
                    </Typography>
                    <LoginPartial />
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default AppNav;
