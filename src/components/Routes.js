import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AppNav from "./AppNav";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        {/* NotFound for invalid routes */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
