import React, { useEffect } from "react";
import { useAgile, useProxy } from "@agile-ts/react";
import { Agile, globalBind } from "@agile-ts/core";

interface ItemInterface {
  id: number;
  value: string;
}

// ============================================================================================
// Store
// ============================================================================================

// Create Agile Instance
export const App = new Agile();

// Create large Collection
export const ITEMS = App.createCollection<ItemInterface>({
  initialData: Array.from(Array(5000).keys()).map((i) => ({
    id: i,
    value: `Field #${i + 1} value`,
  })),
});

// ============================================================================================
// UI
// ============================================================================================

function FieldEditor({ id }: { id: number }) {
  const item = useAgile(ITEMS.getItem(id));
  return (
    <p>
      Last render at: {new Date().toISOString()}{" "}
      <input
        value={item?.value}
        onChange={(e) => ITEMS.update(id, { value: e.target.value })}
      />
    </p>
  );
}

function JsonDump() {
  const items = useProxy(ITEMS);
  return (
    <p>
      Last render at: {new Date().toISOString()} (
      <b>JSON dump of the first 10 fields</b>) :<br />
      {JSON.stringify(items.slice(0, 10), undefined, 4)}
    </p>
  );
}

export const LargeState = () => {
  // Bind collection global, for better debugging
  // Now we can type '__collection__' in the Browser console and have access to it
  useEffect(() => {
    globalBind("__collection__", ITEMS);
  }, []);

  return (
    <React.Fragment>
      <JsonDump />
      {ITEMS.getAllItemValues().map((item, i) => (
        <FieldEditor key={i} id={item.id} />
      ))}
    </React.Fragment>
  );
};
