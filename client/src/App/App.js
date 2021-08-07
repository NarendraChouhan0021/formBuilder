import React, { Suspense, Component } from "react";
import { connect } from "react-redux"; // Tools
import { withTranslation } from "react-i18next";
import Routes from "./AppRoutes";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ConnectedRouter history={history}>
          <Suspense>
            <Routes />
          </Suspense>
        </ConnectedRouter>
      </React.Fragment>
    );
  }
}

export default withTranslation()(connect(null, null)(App));
