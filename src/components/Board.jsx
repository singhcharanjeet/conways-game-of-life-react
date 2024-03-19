/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Cell from "./Cell";
import {
  countCellNeighbors,
  createEmptyGrid,
  generateRandomGrid,
} from "../utils/helpers";

function Board() {
  const UPDATE_SPEED = 200; // Speed in milliseconds by which the pattern is updated
  const COLUMNS = 25; // Number of columns the generated board should have
  const ROWS = 25; // Number of rows the generated board should have

  const [grid, setGrid] = useState(createEmptyGrid(COLUMNS, ROWS));

  function handleCellClick(columnIndex, rowIndex) {
    setGrid((previousGrid) => {
      return previousGrid.map((columns, i) =>
        columns.map((row, j) =>
          columnIndex === i && rowIndex === j ? (row = !row) : row
        )
      );
    });
  }

  function handleResetButtonClick() {
    setIsSimulating(false);
    simulationRef.current = false;
    setGrid(createEmptyGrid(COLUMNS, ROWS));
    clearInterval(intervalRef.current);
  }

  const [isSimulating, setIsSimulating] = useState(false);
  const simulationRef = useRef(isSimulating);
  simulationRef.current = isSimulating;

  const intervalRef = useRef(null);

  function updateGrid() {
    setGrid((previousGrid) => {
      return previousGrid.map((columns, i) =>
        columns.map((row, j) => {
          const neighbors = countCellNeighbors(previousGrid, i, j);
          if (row) {
            if (neighbors < 2 || neighbors > 3) {
              return false;
            }
          } else {
            if (neighbors === 3) {
              return true;
            }
          }
          return row;
        })
      );
    });
  }

  function startSimulation() {
    if (!simulationRef.current) return;

    intervalRef.current = setInterval(() => {
      updateGrid();
    }, UPDATE_SPEED);
  }

  return (
    <div className="grid">
      <div className="grid-button-group">
        <button
          className={isSimulating ? "stop" : "start"}
          onClick={() => {
            setIsSimulating(!isSimulating);
            if (!isSimulating) {
              simulationRef.current = true;
              startSimulation();
            } else {
              clearInterval(intervalRef.current);
            }
          }}
        >
          {isSimulating ? "Stop" : "Start"}
        </button>
        <button className="reset-button" onClick={handleResetButtonClick}>
          Reset
        </button>
        <button
          className="generate-button"
          onClick={() => setGrid(generateRandomGrid(COLUMNS, ROWS))}
        >
          Generate random grid
        </button>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${COLUMNS}, 25px)` }}
      >
        {grid.map((columns, columnIndex) =>
          columns.map((row, rowIndex) => (
            <Cell
              key={`${columnIndex}-${rowIndex}`}
              onClick={() => {
                handleCellClick(columnIndex, rowIndex);
              }}
              className={row && "active"}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
