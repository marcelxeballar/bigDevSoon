import "./styles.css";
import Home from "./Home/Home";
import Game from "./Game/Game";
import { useState } from "react";

export default function App() {
  document.body.classList.add("flex");

  const [isNewGame, setIsNewGame] = useState(false);

  return (
    <>
      {!isNewGame && <Home isNewGame={isNewGame} setIsNewGame={setIsNewGame} />}
      {isNewGame && <Game setIsNewGame={setIsNewGame} />}
    </>
  );
}
