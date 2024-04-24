/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [heartActive, setHeartActive] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setHeartActive((prev) => !prev);
        }}
      >
        Heart
      </button>
      <div className="flex">{heartActive && <div className="heart"></div>}</div>
      {!heartActive && (
        <>
          {" "}
          <h1>Conway's Game Of Life</h1>
          <Board />
        </>
      )}
    </>
  );
}

export default App;
