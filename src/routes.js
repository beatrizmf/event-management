import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ConfirmRegistration from "./pages/Events/ConfirmRegistration"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/confirm-registration/:idEvent/:idUser" component={ConfirmRegistration} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
