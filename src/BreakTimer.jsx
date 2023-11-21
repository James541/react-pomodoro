import React, { useState } from "react";

function BreakTimer() {
  const [breakLength, setBreakLength] = useState(5);

  function breakLengthUp() {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }

  function breakLengthDown() {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  return (
    <>
      <div className="layout">
        <section id="break-label">Break Length</section>
        <div className="arrows">
          <section id="break-increment" onClick={breakLengthUp}>
            <i className="fa-solid fa-arrow-up fa-lg"></i>
          </section>
          <section id="break-length">{breakLength}</section>
          <section id="break-decrement" onClick={breakLengthDown}>
            <i className="fa-solid fa-arrow-down fa-lg"></i>
          </section>
        </div>
      </div>
    </>
  );
}

export default BreakTimer;
