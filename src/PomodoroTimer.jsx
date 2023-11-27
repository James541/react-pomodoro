import React, { useState } from "react";
//import SessionTimer from "./SessionTimer";
import BreakTimer from "./BreakTimer";

function PomodoroTimer() {
  let buttonClicked = false;
  let time = sessionLength * 60;

  function startTimer() {
    if (buttonClicked == false) {
      buttonClicked = true;
      startStopElement.textContent = "Stop";
      startStopElement.style.backgroundColor = "red";
      intervalId = setInterval(timer, 1000);
    } else {
      buttonClicked = false;
      startStopElement.textContent = "Start";
      startStopElement.style.backgroundColor = "rgb(9, 163, 99)";
      clearInterval(intervalId);
    }
  }

  function timer() {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    timeLeft.textContent = `${minutes}:${seconds}`;

    if (time > 0) {
      time--;
      timeLeft.textContent = `${minutes}:${seconds}`;
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

  return (
    <>
      <div class="timer">
        <div class="timer-elements">
          <section id="timer-label">Session</section>
          <section id="time-left">25:00</section>
        </div>
      </div>

      <button id="start-stop" onclick="startTimer()">
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

export default PomodoroTimer;
