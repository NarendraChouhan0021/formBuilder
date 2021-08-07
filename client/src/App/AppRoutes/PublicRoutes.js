import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../Components/Home";
import EditForm from "../Components/Form/EditForm";
import Login from "../Components/Login";
import PrivateRoute from "./PrivateRoute";
import UserView from "../Components/Responding/UserView";

const PublicRoutes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/form/:formId" component={EditForm} />
      <Route exact path="/s/:formId" component={UserView} />
    </Switch>
  );
};
export default withRouter(PublicRoutes);
