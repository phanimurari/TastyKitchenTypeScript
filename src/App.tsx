import { Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import LoginFormRoute from "./Authentication/login/routes/LoginPageRoute";
import routes from "./common/routes/CommounRoutes";
import { LOGIN_PATH } from "./common/constants/routePathConstants";
import "./App.css";
import stores from "./stores";

const App = () =>
  <Provider {...stores}>

    <Switch>
      <Route exact path={LOGIN_PATH} component={LoginFormRoute} />
      {routes}
    </Switch>
  </Provider>

export default App;
