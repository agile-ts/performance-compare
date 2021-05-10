import React, { useEffect, useState } from "react";
import { useAgile } from "@agile-ts/react";
import { Agile, State } from "@agile-ts/core";

const App = new Agile();

const TOTAL_ROW_COUNT = App.createState(50);
const TOTAL_COLUMN_COUNT = App.createState(50);
const MATRIX = App.createComputed<State<State<number>[]>[]>(() => {
  return Array.from(Array(TOTAL_ROW_COUNT.value).keys()).map((i) =>
    App.createState(
      Array.from(Array(TOTAL_COLUMN_COUNT.value).keys()).map((j) =>
        App.createState(0)
      )
    )
  );
});

const TableCell = ({ cellState }: { cellState: State<number> }) => {
  const value = useAgile(cellState);
  return <>{value.toString(16)}</>;
};

const MatrixView = (props: {
  interval: number;
  callsPerInterval: number;
  totalRows: number;
  totalColumns: number;
}) => {
  const { totalRows, totalColumns } = props;

  // schedule interval updates
  useEffect(() => {
    const t = setInterval(() => {
      function randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < props.callsPerInterval; i += 1) {
        MATRIX.value[randomInt(0, totalRows)].value[
          randomInt(0, totalColumns)
        ].set((p) => p + randomInt(0, 5));
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
          {MATRIX.value.map((row, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.value.map((value, columnIndex) => (
                <td key={columnIndex}>
                  <TableCell cellState={value} />
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
  const [totalRows, totalColumns] = useAgile([
    TOTAL_ROW_COUNT,
    TOTAL_COLUMN_COUNT,
  ]);
  const [rate, setRate] = useState(50);
  const [timer, setTimer] = useState(10);

  return (
    <>
      <div>
        <p>
          <span>Total rows: {totalRows} </span>
          <button onClick={() => TOTAL_ROW_COUNT.set((p) => p - 10 || 10)}>
            -10
          </button>
          <button onClick={() => TOTAL_ROW_COUNT.set((p) => p + 10)}>
            +10
          </button>
        </p>
        <p>
          <span>Total columns: {totalColumns} </span>
          <button onClick={() => TOTAL_COLUMN_COUNT.set((p) => p - 10 || 10)}>
            -10
          </button>
          <button onClick={() => TOTAL_COLUMN_COUNT.set((p) => p + 10)}>
            +10
          </button>
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
