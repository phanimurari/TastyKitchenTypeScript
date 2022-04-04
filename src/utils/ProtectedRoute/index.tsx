import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";
import { isLoggedIn } from "../authUtilis";
import { LOGIN_PATH } from "../../common/constants/routePathConstants";

const ProtectedRoute = (props: RouteProps) => {
  if (isLoggedIn()) {
    return <Route {...props} />;
  }
  return <Redirect to={LOGIN_PATH} />;
};

export default ProtectedRoute;
