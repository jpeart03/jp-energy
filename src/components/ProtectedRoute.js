import { Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotFound from "./NotFound";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <NotFound />
      }
    />
  );
};

export default ProtectedRoute;
