import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Container, Typography } from "@material-ui/core";
import { StatesComboBox } from "../components/StatesComboBox";
import { Charts } from "../components/Charts";

import "./Home.scss";

const Home = () => {
  const defaultState = { name: "", abbr: "" };
  const [USState, setUSState] = useState(defaultState);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const docSnap = await getDoc(doc(db, "PowerProfile", currentUser.uid));

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUSState(data.defaultState);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getData();
    }
  }, [currentUser]);

  const handleSelect = (selectedState) => {
    if (selectedState) setUSState(selectedState);
    else setUSState(defaultState);
  };

  return (
    <Container className="home" maxWidth="md">
      <Typography variant="h2" component="h1">
        What's the source of your power?
      </Typography>
      <Typography variant="h6" component="p">
        This isn't a super-hero site, but do you know what powers your home
        state? Lightsource can help you discover the sources of your state's
        electricity and how much it costs!
      </Typography>
      <Typography variant="h6" component="p">
        Select a state to get started.
      </Typography>
      <StatesComboBox
        onSelectState={handleSelect}
        value={USState}
        labelText="Select a state"
      />
      <Charts stateAbbr={USState.abbr} />
    </Container>
  );
};

export default Home;
