import React from "react";
import { Routes, Route } from "react-router-dom";
import { LargeState } from "./tests/LargeState";
import { FrequentUpdates } from "./tests/FrequentUpdates";

export * from "./tests/LargeState";
export * from "./tests/FrequentUpdates";

export const SubRoute = () => {
  return (
    <Routes>
      <Route path="/largestate" element={<LargeState />} />
      <Route path="/frequentupdates" element={<FrequentUpdates />} />
    </Routes>
  );
};
