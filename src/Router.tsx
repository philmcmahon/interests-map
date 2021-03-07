import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import Location from "./components/Location";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Map} />
      <Route path="/location/:id" component={Location} />
    </Switch>
  </BrowserRouter>
);

export default Router;
