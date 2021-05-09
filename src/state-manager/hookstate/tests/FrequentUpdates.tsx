// Inspired by https://hookstate.js.org/docs/performance-frequent-updates/

import React, { useEffect, useState } from "react";
import { useState as useHookState, State } from "@hookstate/core";

const TableCell = (props: { cellState: State<number> }) => {
  const state = useHookState(props.cellState);
  return <>{state.value.toString(16)}</>;
};

const MatrixView = (props: {
  totalRows: number;
  totalColumns: number;
  interval: number;
  callsPerInterval: number;
}) => {
  const totalRows = props.totalRows;
  const totalColumns = props.totalColumns;
  // we use local per component state,
  // but the same result would be for the global state
  // if it was created by createState
  const matrixState = useHookState(
    Array.from(Array(totalRows).keys()).map((i) =>
      Array.from(Array(totalColumns).keys()).map((j) => 0)
    )
  );
  // schedule interval updates
  useEffect(() => {
    const t = setInterval(() => {
      function randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < props.callsPerInterval; i += 1) {
        matrixState[randomInt(0, totalRows)][randomInt(0, totalColumns)].set(
          (p) => p + randomInt(0, 5)
        );
      }
    }, props.interval);
    return () => clearInterval(t);
  });

  return (
    <div style={{ overflow: "scroll" }}>
      <table
        style={{
          border: "solid",
          borderWidth: 1,
          borderColor: "grey",
          color: "#00FF00",
          backgroundColor: "black",
        }}
      >
        <tbody>
          {matrixState.map((rowState, rowIndex: number) => (
            <tr key={rowIndex}>
              {rowState.map((cellState, columnIndex) => (
                <td key={columnIndex}>
                  <TableCell cellState={cellState} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const FrequentUpdates = () => {
  const [totalRows, setTotalRows] = useState(50);
  const [totalColumns, setTotalColumns] = useState(50);
  const [rate, setRate] = useState(50);
  const [timer, setTimer] = useState(10);

  return (
    <>
      <div>
        <p>
          <span>Total rows: {totalRows} </span>
          <button onClick={() => setTotalRows((p) => p - 10 || 10)}>-10</button>
          <button onClick={() => setTotalRows((p) => p + 10)}>+10</button>
        </p>
        <p>
          <span>Total columns: {totalColumns} </span>
          <button onClick={() => setTotalColumns((p) => p - 10 || 10)}>
            -10
          </button>
          <button onClick={() => setTotalColumns((p) => p + 10)}>+10</button>
        </p>
        <p>Total cells: {totalColumns * totalRows}</p>
        <p>
          <span>Cells to update per timer interval: {rate} </span>
          <button onClick={() => setRate((p) => p - 1 || 1)}>-1</button>
          <button onClick={() => setRate((p) => p + 1)}>+1</button>
          <button onClick={() => setRate((p) => (p > 10 ? p - 10 : 1))}>
            -10
          </button>
          <button onClick={() => setRate((p) => p + 10)}>+10</button>
        </p>
        <p>
          <span>Timer interval in ms: {timer} </span>
          <button onClick={() => setTimer((p) => (p > 1 ? p - 1 : 1))}>
            -1
          </button>
          <button onClick={() => setTimer((p) => p + 1)}>+1</button>
          <button onClick={() => setTimer((p) => (p > 10 ? p - 10 : 1))}>
            -10
          </button>
          <button onClick={() => setTimer((p) => p + 10)}>+10</button>
        </p>
      </div>
      <MatrixView
        key={Math.random()}
        totalRows={totalRows}
        totalColumns={totalColumns}
        interval={timer}
        callsPerInterval={rate}
      />
    </>
  );
};
