import React, { useEffect, useState } from "react";
import { useAgile } from "@agile-ts/react";
import { Agile, State } from "@agile-ts/core";

const App = new Agile();

const MATRIX = App.createState<State<State<number>[]>[]>([]);

const TableCell = ({ cellValue }: { cellValue: State<number> }) => {
  const value = useAgile(cellValue);
  return <>{value.toString(16)}</>;
};

const MatrixView = (props: {
  totalRows: number;
  totalColumns: number;
  interval: number;
  callsPerInterval: number;
}) => {
  const { totalRows, totalColumns } = props;

  useEffect(() => {
    MATRIX.set(
      Array.from(Array(totalRows).keys()).map((i) =>
        App.createState(
          Array.from(Array(totalColumns).keys()).map((j) => App.createState(0))
        )
      )
    );
  }, [totalColumns, totalRows]);

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
                  <TableCell cellValue={value} />
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
  const [totalRows, setTotalRows] = useState(10);
  const [totalColumns, setTotalColumns] = useState(10);
  const [rate, setRate] = useState(10);
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
