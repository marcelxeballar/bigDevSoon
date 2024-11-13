import logo from "../Assets/logo.svg";
import { useState } from "react";

export default function Home({ isNewGame, setIsNewGame }) {
  console.log(isNewGame);
  return (
    <section className="main flex-col">
      <img src={logo} alt="Game logo" />
      <h1>Tic Tac Toe</h1>
      <p>
        Dive into the excitement now and experience the timeless joy of this
        classic game!
      </p>
      <button className="new-game-btn" onClick={() => setIsNewGame(!isNewGame)}>
        New Game
      </button>
    </section>
  );
}
