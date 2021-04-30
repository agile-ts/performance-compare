import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ATLargeState from "./state-manager/agile-ts/ATLargeState";
import HSLargeState from "./state-manager/hookstate/HSLargeState";

const App = () => {
  return (
    <Router>
      <Route path="/agile/largestate">
        <ATLargeState />
      </Route>
      <Route path="/hookstate/largestate">
        <HSLargeState />
      </Route>
    </Router>
  );
};

export default App;
