import React from "react";
import { useAgile, useProxy } from "@agile-ts/react";
import { Agile } from "@agile-ts/core";

// Create Agile Instance
export const App = new Agile();

// Create large State
export const MY_LARGE_COLLECTION = App.createCollection({
  initialData: Array.from(Array(2000).keys()).map((i) => ({
    id: i,
    value: `Field #${i + 1} value`,
  })),
});

function FieldEditor({ id }: { id: number }) {
  const item = useAgile(MY_LARGE_COLLECTION.getItem(id));
  return (
    <p>
      Last render at: {new Date().toISOString()}{" "}
      <input
        value={item?.value}
        onChange={(e) =>
          MY_LARGE_COLLECTION.update(id, { value: e.target.value })
        }
      />
    </p>
  );
}

function JsonDump() {
  const collection = useProxy(MY_LARGE_COLLECTION);
  return (
    <p>
      Last render at: {new Date().toISOString()} (
      <b>JSON dump of the first 10 fields</b>) :<br />
      {JSON.stringify(collection, undefined, 4)}
    </p>
  );
}

const ATLargeState = () => {
  return (
    <>
      <JsonDump />
      {MY_LARGE_COLLECTION.getAllItemValues().map((item, i) => (
        <FieldEditor key={i} id={item.id} />
      ))}
    </>
  );
};

export default ATLargeState;
