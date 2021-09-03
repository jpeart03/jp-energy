import { Container, Typography, Button } from "@material-ui/core";
import { useEffect } from "react";
import { StatesComboBox } from "../components/StatesComboBox";

import "./Home.scss";

const Home = () => {
    return (
        <Container className="home" maxWidth="md">
            {/* Make this a hero component*/}
            <Typography variant="h2" component="h1">
                What's the source of your power?
            </Typography>
            <Typography variant="h6" component="p">
                No, this isn't a super-hero site, but do you know what keeps the
                lights on in your home state? How clean is your state's energy?
                Lightsource can help you find out. Use the form below to get
                started.
            </Typography>
            <StatesComboBox />
        </Container>
    );
};

export default Home;
