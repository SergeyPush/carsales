import { Route, Switch } from "react-router-dom";
import React from "react";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

import CarDetails from "./pages/CarDetails";
import AddNewCar from "./pages/AddNewCar";
import MyCars from "./pages/MyCars.tsx";
import UserDetails from "./pages/UserDetails";
import AuthenticateFirst from "./pages/AuthenticateFirst";
import EditCar from "./pages/EditCar";

export const useRoutes = (isAuthorised) => {
  if (isAuthorised) {
    return (
      <Switch>
        <Route path="/addcar" component={AddNewCar} />
        <Route path="/edit/:id" component={EditCar} />
        <Route path="/details" component={CarDetails} />
        <Route path="/mycars" component={MyCars} />
        <Route path="/user" component={UserDetails} />
        <Route path="/car/:id" component={CarDetails} />

        <Route path="/" component={Home} exact />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/addcar">
          <AuthenticateFirst />
        </Route>
        <Route path="/auth" component={Auth} />
        <Route path="/car/:id" component={CarDetails} />
        <Route path="/" component={Home} exact />
      </Switch>
    );
  }
};
