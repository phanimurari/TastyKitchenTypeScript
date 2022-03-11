import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginFormRoute from "./routes/LoginPageRoute";
import HomeRoute from "./routes/HomeRoute";
import CartRoute from "./routes/CartRoute";
import RestuarantDetailsRoute from "./routes/RestuarantDetailsRoute";

import "./App.css";
import OrderPlacedRoute from "./routes/OrderPlacedRoute";
import ProfileRoute from "./routes/ProfileRoute";

const routePaths = {
  loginPagePath: "/login",
  homePagePath: "/",
  cartPagePath: "/cart",
  resturantDetails: "/restaurants-list/:id",
  orderPlacedPath: "/order-placed",
  profilePagePath: "/my-profile",
};

const App = () => (
  <Switch>
    <Route exact path={routePaths.loginPagePath} component={LoginFormRoute} />
    <ProtectedRoute
      exact
      path={routePaths.homePagePath}
      component={HomeRoute}
    />
    <ProtectedRoute
      exact
      path={routePaths.resturantDetails}
      component={RestuarantDetailsRoute}
    />
    <ProtectedRoute
      exact
      path={routePaths.cartPagePath}
      component={CartRoute}
    />
    <ProtectedRoute
      exact
      path={routePaths.orderPlacedPath}
      component={OrderPlacedRoute}
    />
    <ProtectedRoute
      exact
      path={routePaths.profilePagePath}
      component={ProfileRoute}
    />
  </Switch>
);

export default App;
