import React, { useState, useEffect, useRef } from "react";

let intervalId;

function SessionTimer() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [time, setTime] = useState(minutes * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [startStopDisplay, setStartStopDisplay] = useState("Start");
  const [buttonColor, setButtonColor] = useState("green-start-stop");
  const [breakFlag, setBreakFlag] = useState(false);
  const [timerType, setTimerType] = useState("Session");

  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setMinutes(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    setTime(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (timerActive) {
      setStartStopDisplay("Stop");
      setButtonColor("red-start-stop");

      intervalId = setInterval(() => {
        setTime((currentMinutes) =>
          currentMinutes > 0 ? currentMinutes - 1 : 0
        );
      }, 1000);
    } else {
      clearInterval(intervalId);
      setStartStopDisplay("Start");
      setButtonColor("green-start-stop");
    }

    // Cleanup interval on component unmount or when timerActive changes
    return () => clearInterval(intervalId);
  }, [timerActive]);

  useEffect(() => {
    if (time < 1 && timerType === "Break") {
      gong();
      setStartStopDisplay("Start");
      setButtonColor("green-start-stop");
      setTime(sessionLength * 60);
      clearInterval(intervalId);

      setTimerType("Session");

      setTimerActive(false);
    } else if (time < 1) {
      gong();
      setStartStopDisplay("Start");
      setButtonColor("green-start-stop");
      setTime(breakLength * 60);
      clearInterval(intervalId);
      setTimerType("Break");
      setTimerActive(false);
    }
  }, [time]);

  const handleTimerToggle = () => {
    setTimerActive((prevTimerActive) => !prevTimerActive);
  };

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
  function reset() {
    setSessionLength(25);
    setBreakLength(5);
    setTime(25 * 60);
    setTimerActive(false);
    clearInterval(intervalId);
    setTimerType("Session");
  }

  function testTimer() {
    setTime(3);
  }

  function gong() {
    playAudio();
  }

  return (
    <>
      <div className="completeContainer">
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
            <section id="timer-label">{timerType}</section>
            <section id="time-label">{`${Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}:${Math.floor(time % 60)
              .toString()
              .padStart(2, "0")} `}</section>
          </div>
        </div>

        <button id={buttonColor} onClick={handleTimerToggle}>
          {startStopDisplay}
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
      {/* <button onClick={testTimer}>Test</button>
      <button onClick={gong}>Gong</button> */}

      <audio
        id="beep"
        ref={audioRef}
        src="https://www.orangefreesounds.com/wp-content/uploads/2014/11/Gong-sound.mp3"
      ></audio>
    </>
  );
}

export default SessionTimer;

/* OLD CODE MAY NOT NEED :
function timer() {
    // IF NOT FLAGGED - Start timer
    let intervalId;

    if (!timerActive) {
      setTimerActive(true);
      setStartStopDisplay("Stop");

      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (timerActive) {
      clearInterval(intervalId);
      setTimerActive(false); //THIS ISNT WORKING
      setStartStopDisplay("Start");
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
