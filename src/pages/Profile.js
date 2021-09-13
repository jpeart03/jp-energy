import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  Breadcrumbs,
  Container,
  Typography,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
  Button,
  Box,
  Snackbar,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { StatesComboBox } from "../components/StatesComboBox";
import "./Profile.scss";
import { Alert } from "@material-ui/lab";

const Profile = () => {
  const blankDefaultState = { name: "", abbr: "" };
  const blankPowerPreference = "";
  const [defaultState, setDefaultState] = useState(blankDefaultState);
  const [powerPreference, setPowerPreference] = useState(blankPowerPreference);
  const [helperText, setHelperText] = useState(" ");
  const [error, setError] = useState();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();

  const primaryRedTheme = createTheme({
    palette: {
      primary: red,
    },
  });

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const docSnap = await getDoc(doc(db, "PowerProfile", currentUser.uid));

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDefaultState(data.defaultState);
          setPowerPreference(data.powerPreference);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getData();
    }
  }, [currentUser]);

  const handleHomeClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const handlePowerPreferenceChange = (event) => {
    setPowerPreference(event.target.value);
    setError(false);
    setHelperText(" "); // blank space so element still exists, but is blank
  };

  const handleSelectState = (selectedState) => {
    setError(false);
    setHelperText(" ");
    setDefaultState(selectedState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Save to firebase
    await setDoc(doc(db, "PowerProfile", currentUser.uid), {
      defaultState: defaultState,
      powerPreference: powerPreference,
    });
    setToastMessage("Your Power Profile has been saved.");
    setToastOpen(true);
  };

  const handleClearProfile = async () => {
    await deleteDoc(doc(db, "PowerProfile", currentUser.uid));
    setDefaultState(blankDefaultState);
    setPowerPreference(blankPowerPreference);
    setToastMessage("Your Power Profile has been cleared.");
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <Container className="profile" maxWidth="md">
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
        <Link color="inherit" href="/" onClick={handleHomeClick}>
          Lightsource
        </Link>
        <Typography color="textPrimary">Power Profile</Typography>
      </Breadcrumbs>
      <Typography variant="h2" component="h1">
        Power Profile
      </Typography>
      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" error={error} className="">
          <FormLabel component="legend">
            What's more important to you: The price or source of your power?
          </FormLabel>
          <RadioGroup
            aria-label="power preference"
            name="powerPreference"
            value={powerPreference}
            onChange={handlePowerPreferenceChange}
          >
            <FormControlLabel
              value="price"
              control={<Radio />}
              label="The price."
            />
            <FormControlLabel
              value="source"
              control={<Radio />}
              label="The source."
            />
          </RadioGroup>
          <StatesComboBox
            onSelectState={handleSelectState}
            value={defaultState}
            labelText="Select default state"
          />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
        <Box>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ marginRight: "0.5rem" }}
          >
            Save Profile
          </Button>
          <ThemeProvider theme={primaryRedTheme}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleClearProfile}
            >
              Clear Profile
            </Button>
          </ThemeProvider>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={handleToastClose}
        autoHideDuration={6000}
      >
        <Alert onClose={handleToastClose} severity="success">
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
