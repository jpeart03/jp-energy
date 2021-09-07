import { useState } from "react";

import { Container, Typography } from "@material-ui/core";
import { StatesComboBox } from "../components/StatesComboBox";
import { Charts } from "../components/Charts";

import "./Home.scss";

const Home = () => {
    const [stateAbbr, setStateAbbr] = useState("");
    const onGetEnergyData = (selectedStateAbbr) => {
        setStateAbbr(selectedStateAbbr);
    };

    return (
        <Container className="home" maxWidth="md">
            <Typography variant="h2" component="h1">
                What's the source of your power?
            </Typography>
            <Typography variant="h6" component="p">
                No - this isn't a super-hero site, but do you know what powers
                your home state?
            </Typography>
            <Typography variant="h6" component="p">
                Lightsource can help you find out. Use the form below to get
                started:
            </Typography>
            <StatesComboBox onGetEnergyData={onGetEnergyData} />
            <Charts stateAbbr={stateAbbr} />
        </Container>
    );
};

export default Home;
