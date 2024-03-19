/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Cell({ className, onClick }) {
  return (
    <>
      <div onClick={onClick} className={`cell ${className}`}></div>
    </>
  );
}

export default Cell;
