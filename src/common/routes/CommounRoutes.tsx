
import ProtectedRoute from "../../utils/ProtectedRoute"

import { CART_PATH, ORDER_PLACED, PROFILE_PATH, RESTAURANT_DETAILS, USER_HOME_PATH } from '../constants/routePathConstants'

import HomeRoute from '../../routes/HomeRoute'
import RestuarantDetailsRoute from "../../routes/RestuarantDetailsRoute"
import CartRoute from "../../routes/CartRoute"
import OrderPlacedRoute from "../../routes/OrderPlacedRoute"
import ProfileRoute from "../../routes/ProfileRoute"


const routes = [

  <ProtectedRoute key={USER_HOME_PATH} exact path={USER_HOME_PATH} component={HomeRoute} />,

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
  />

]


export default routes