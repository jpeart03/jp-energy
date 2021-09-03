import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Container, Typography } from "@material-ui/core";

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
    <Container>
      {user ? (
        <Typography vairant="h1">Logged In</Typography>
      ) : (
        <Typography vairant="h1">Logged Out</Typography>
      )}
    </Container>
  );
};

export default Home;
