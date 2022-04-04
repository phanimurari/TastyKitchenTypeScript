import ProtectedRoute from "../../utils/ProtectedRoute";

import HomeRoute from "../../User/routes/HomeRoute";
import RestuarantDetailsRoute from "../../User/routes/RestuarantDetailsRoute";
import CartRoute from "../../User/routes/CartRoute";
import OrderPlacedRoute from "../../User/routes/OrderPlacedRoute";
import ProfileRoute from "../../User/routes/ProfileRoute";
import {
  CART_PATH,
  ORDER_PLACED,
  PROFILE_PATH,
  RESTAURANT_DETAILS,
  USER_HOME_PATH,
} from "../constants/routePathConstants";

const routes = [
  <ProtectedRoute
    key={USER_HOME_PATH}
    exact
    path={USER_HOME_PATH}
    component={HomeRoute}
  />,

  <ProtectedRoute
    key={RESTAURANT_DETAILS}
    exact
    path={`${RESTAURANT_DETAILS}:id`}
    component={RestuarantDetailsRoute}
  />,

  <ProtectedRoute
    key={CART_PATH}
    exact
    path={CART_PATH}
    component={CartRoute}
  />,

  <ProtectedRoute
    key={ORDER_PLACED}
    exact
    path={ORDER_PLACED}
    component={OrderPlacedRoute}
  />,

  <ProtectedRoute
    key={PROFILE_PATH}
    exact
    path={PROFILE_PATH}
    component={ProfileRoute}
  />,
];

export default routes;
