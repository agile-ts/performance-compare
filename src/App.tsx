import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import * as Agile from "./state-manager/agile-ts";
import * as Hookstate from "./state-manager/hookstate";
import * as Redux from "./state-manager/react-redux";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agile.LargeState />} />
        <Route path="/agile/*" element={<Agile.SubRoute />} />
        <Route path="/hookstate/*" element={<Hookstate.SubRoute />} />
        <Route path="/redux/*" element={<Redux.SubRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
