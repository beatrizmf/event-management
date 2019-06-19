import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ConfirmRegistration from "./pages/Events/ConfirmRegistration"
import CreateEvents from './pages/Events/CreateEvents'
import ListEventsAdministrator from "./pages/Events/ListEventsAdministrator";
import ListEventsUser from "./pages/Events/ListEventsUser";
import FrequencyList from "./pages/Events/FrequencyList";

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
      <PrivateRoute exact path="/user/events" component={ListEventsUser} />
      <PrivateRoute exact path="/admin/events" component={ListEventsAdministrator} />
      <PrivateRoute exact path="/admin/events/create" component={CreateEvents} />
      <PrivateRoute exact path="/admin/events/frequency/:idEvent" component={FrequencyList} />
      <PrivateRoute path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
