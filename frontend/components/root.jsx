import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app";
import SessionFormContainer from "./session_form/session_form_container";
import HomeContainer from "./home/home_container";

const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace("/");
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace("/home");
    }
  };

  return (
    <Provider store={store}>
          <Router>
              <Switch>
                  <Route
                      exact
                      path="/"
                      render={() => <App onEnter={_redirectIfLoggedIn} />}
                  />
                  <Route
                      exact
                      path="/home"
                      render={() => (<HomeContainer onEnter={_ensureLoggedIn} />)}
                  />
              </Switch>
          </Router>
    </Provider>
  );
};

export default Root;
