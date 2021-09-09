import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Compare from "../pages/Compare";
import AppNav from "./AppNav";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/compare" component={Compare} />
        {/* NotFound for invalid routes */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
