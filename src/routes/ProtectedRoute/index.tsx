import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";
import Cookie from "js-cookie";

const ProtectedRoute = (props: RouteProps) => {
  const token = Cookie.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
