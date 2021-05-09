import React from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

interface ItemInterface {
  id: number;
  value: string;
}

interface ItemsState {
  items: ItemInterface[];
}

type UpdateItemAction = { type: string; payload: ItemInterface };

// ============================================================================================
// Store
// ============================================================================================

// Actions
const updateItem = (id: number, newValue: string): UpdateItemAction => {
  return {
    type: "UPDATE_ITEM",
    payload: { id, value: newValue },
  };
};

// Reducer
const initialState: ItemsState = {
  items: Array.from(Array(5000).keys()).map((i) => ({
    id: i,
    value: `Field #${i + 1} value`,
  })),
};

const itemsReducer = (
  state: ItemsState = initialState,
  action: UpdateItemAction
) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      const items = state.items;
      const itemIndex = items.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        id: action.payload.id,
        value: action.payload.value,
      };

      return {
        ...state,
        items: updatedItems,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(itemsReducer);

// ============================================================================================
// UI
// ============================================================================================

function FieldEditor({ id }: { id: number }) {
  const item = useSelector<ItemsState, ItemInterface | undefined>((state) => {
    for (const item of state.items) {
      if (item.id === id) {
        return item;
      }
    }
  });
  const dispatch = useDispatch();

  return (
    <p>
      Last render at: {new Date().toISOString()}{" "}
      <input
        value={item?.value}
        onChange={(e) => dispatch(updateItem(id, e.target.value))}
      />
    </p>
  );
}

function JsonDump() {
  const items = useSelector<ItemsState, ItemInterface[]>(
    (state) => state.items
  );
  return (
    <p>
      Last render at: {new Date().toISOString()} (
      <b>JSON dump of the first 10 fields</b>) :<br />
      {JSON.stringify(items.slice(0, 10), undefined, 4)}
    </p>
  );
}

export const LargeState = () => {
  return (
    <Provider store={store}>
      <JsonDump />
      {store.getState().items.map((item, i) => (
        <FieldEditor key={i} id={item.id} />
      ))}
    </Provider>
  );
};
