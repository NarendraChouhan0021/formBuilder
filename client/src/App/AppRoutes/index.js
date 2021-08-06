import React, { Component } from "react";
import PublicRoutes from "./PublicRoutes";
import { connect } from "react-redux";

class Routes extends Component {
  render() {
    return <PublicRoutes />;
  }
}

export default connect(null, null)(Routes);
