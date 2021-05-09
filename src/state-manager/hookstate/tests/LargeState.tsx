import React from "react";
import { State, useState } from "@hookstate/core";

function FieldEditor(props: { fieldState: State<string> }) {
  const scopedState = useState(props.fieldState);
  console.log("Scope State", props.fieldState, scopedState.get());
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
  const state = useState(
    Array.from(Array(2000).keys()).map((i) => `Field #${i + 1} value`)
  );

  return (
    <>
      <JsonDump state={state} />
      {state.map((taskState, taskIndex) => (
        <FieldEditor key={taskIndex} fieldState={taskState} />
      ))}

      {/* Now the State is through the .get() subscribed to the parent component, which will rerender the children too
          -> HookState doesn't subscribe through the hook. It subscribes through the .get() method
          state.map((taskState) => (
        <p>{taskState.get()}</p>
      ))
         */}
    </>
  );
};
