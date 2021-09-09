import { useHistory } from "react-router-dom";
import { Breadcrumbs, Container, Typography, Link } from "@material-ui/core";
import "./Compare.scss";

const Compare = () => {
  const history = useHistory();

  const handleHomeClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <Container className="compare" maxWidth="md">
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
        <Link color="inherit" href="/" onClick={handleHomeClick}>
          Lightsource
        </Link>
        <Typography color="textPrimary">Compare states</Typography>
      </Breadcrumbs>
      <Typography variant="h2" component="h1">
        State Comparison
      </Typography>
      {/** TODO: Add state picker & line graph */}
    </Container>
  );
};

export default Compare;
