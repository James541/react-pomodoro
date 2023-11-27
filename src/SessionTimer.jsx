import React, { useState, useEffect } from "react";

function SessionTimer() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [time, setTime] = useState(sessionLength * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setMinutes(sessionLength);
  }, [sessionLength]);

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

  function sessionLengthUp() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  }

  function sessionLengthDown() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  }

  function timer() {
    // IF NOT FLAGGED - Start timer
    if (!timerActive) {
      setTimerActive(true);

      const intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalId);
      setTimerActive(false); //THIS ISNT WORKING
    }

    //ELSE
  }

  /* function timer() {
    setMinutes(
      Math.floor( / 60)
        .toString()
        .padStart(2, "0")
    );
    const seconds = (time % 60).toString().padStart(2, "0");

    
   
   
   
    if (time > 0) {
      time--;
    } else if (time <= 0 && flag == "break") {
      time = breakLength * 60;
      timerLabelElement.textContent = "Break";
      flag = "session";
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      audioElement.play();
    } else if (time <= 0 && flag == "session") {
      time = sessionLength * 60;
      timerLabelElement.textContent = "Session";
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      flag = "break";

      audioElement.play();
    }
  }
  */

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
      <div className="layout">
        <section id="session-label">Session Length</section>
        <div className="arrows">
          <section id="session-increment" onClick={sessionLengthUp}>
            <i className="fa-solid fa-arrow-up fa-lg"></i>
          </section>
          <section id="session-length">{sessionLength}</section>
          <section id="session-decrement" onClick={sessionLengthDown}>
            <i className="fa-solid fa-arrow-down fa-lg"></i>
          </section>
        </div>
      </div>
      <div class="timer">
        <div class="timer-elements">
          <section id="timer-label">Session</section>
          <section id="time-label">{`${Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(time % 60)
            .toString()
            .padStart(2, "0")} `}</section>
        </div>
      </div>

      <button id="start-stop" onClick={timer}>
        Start
      </button>
      <button id="reset" onclick="reset()">
        Reset
      </button>

      <audio
        id="beep"
        src="https://www.orangefreesounds.com/wp-content/uploads/2014/11/Gong-sound.mp3"
      ></audio>
    </>
  );
}

export default SessionTimer;
