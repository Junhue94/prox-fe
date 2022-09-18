import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Main from "./containers/Main"
import Location from "./containers/Location"

import './App.css';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/location">
                  <Location />
              </Route>
              <Route path="*">
                  <Main />
              </Route>
          </Switch>
      </Router>
    )
}

export default App;
