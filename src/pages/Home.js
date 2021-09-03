import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Container, Typography, Button } from "@material-ui/core";
import { StatesComboBox } from "../components/StatesComboBox";
import "./Home.scss";

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <Container className="home" maxWidth="md">
      <Typography variant="h2" component="h1">
        What's the source of your power?
      </Typography>
      <Typography variant="h6" component="p">
        No, this isn't a super-hero site, but do you know what keeps the lights
        on in your home state? How clean is your state's energy? Lightsource can
        help you find out. Use the form below to get started.
      </Typography>
      <StatesComboBox />
      <Button variant="contained" color="primary">
        Get energy data
      </Button>
    </Container>
  );
};

export default Home;
