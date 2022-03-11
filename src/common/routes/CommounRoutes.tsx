import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const CommonRoute = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch />
  </Router>
);

export default CommonRoute;
