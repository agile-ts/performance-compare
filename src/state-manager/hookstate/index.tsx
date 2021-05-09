import React from "react";
import { Routes, Route } from "react-router-dom";
import { LargeState } from "./tests/LargeState";

export * from "./tests/LargeState";

export const SubRoute = () => {
  return (
    <Routes>
      <Route path="/largestate" element={<LargeState />} />
    </Routes>
  );
};
