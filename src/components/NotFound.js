import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import "./NotFound.scss";

const NotFound = () => {
    const history = useHistory();

    const handleClick = (event) => {
        history.push("/");
    };

    return (
        <Container className="not-found" maxWidth="md">
            <Typography variant="h2" component="h1">
                Page not found...
            </Typography>
            <Typography variant="h6" component="p">
                Sorry, but that page doesn't exist on this site.
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleClick}
            >
                <ArrowBack />
                Back to Home
            </Button>
        </Container>
    );
};

export default NotFound;
