// Inspired by https://hookstate.js.org/docs/performance-large-state

import React from "react";
import { State, useState } from "@hookstate/core";

function FieldEditor(props: { fieldState: State<string> }) {
  const scopedState = useState(props.fieldState);
  return (
    <p>
      Last render at: {new Date().toISOString()}{" "}
      <input
        value={scopedState.get()}
        onChange={(e) => scopedState.set(e.target.value)}
      />
    </p>
  );
}

function JsonDump(props: { state: State<string[]> }) {
  const state = useState(props.state);
  return (
    <p>
      Last render at: {new Date().toISOString()} (
      <b>JSON dump of the first 10 fields</b>) :<br />
      {JSON.stringify(state.get().slice(0, 10), undefined, 4)}
    </p>
  );
}

export const LargeState = () => {
  // we use local per component state,
  // but the same result would be for the global state
  // if it was created by createState
  // NOTE: The State is subscribed through the .get() method to the Component and not through the useState() hook
  const state = useState(
    Array.from(Array(5000).keys()).map((i) => `Field #${i + 1} value`)
  );

  return (
    <React.Fragment>
      <JsonDump state={state} />
      {state.map((taskState, taskIndex) => (
        <FieldEditor key={taskIndex} fieldState={taskState} />
      ))}
    </React.Fragment>
  );
};
