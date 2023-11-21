import React, { useState } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import Tomato from "/Tomato.jpg";
import BreakTimer from "./BreakTimer";
function App() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>🍅🍅Pomodoro Timer🍅🍅</title>
        <link rel="stylesheet" href="style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <h1>Pomodorooo</h1>
      <BreakTimer />
    </>
  );
}

export default App;
