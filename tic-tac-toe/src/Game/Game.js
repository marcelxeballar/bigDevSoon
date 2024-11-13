import { useState } from "react";
import logo from "../Assets/logo.svg";
import oSvg from "../Assets/o.svg";
import xSvg from "../Assets/x.svg";

const Ticks = {
  X: 1,
  XImg: xSvg,
  O: 0,
  OImg: oSvg,
  Empty: null,
};

export default function Game({ setIsNewGame }) {
  const [ticsArray, setTicsArray] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(Ticks.Empty))
  );

  const [turn, setTurn] = useState(Math.round(Math.random()));
  const [targetCell, setTargetCell] = useState(null);
  const [winner, setWinner] = useState(null);

  return (
    <section className="flex-col">
      <LogoAndTurns turn={turn} winner={winner} ticsArray={ticsArray} />
      <GameContainer
        ticsArray={ticsArray}
        targetCell={targetCell}
        setTargetCell={setTargetCell}
        turn={turn}
        winner={winner}
        setWinner={setWinner}
      />
      {!winner && (
        <button
          className="save-btn"
          onClick={() => {
            if (targetCell) {
              handleSaveTic(
                targetCell - 1,
                ticsArray,
                setTicsArray,
                turn,
                targetCell,
                setTargetCell,
                setTurn,
                winner,
                setWinner
              );
            }
          }}
        >
          Save Tic
        </button>
      )}
      <button
        className="reset-btn"
        onClick={() => {
          if (winner) {
            setTicsArray(
              Array.from({ length: 3 }, () => Array(3).fill(Ticks.Empty))
            );
            setIsNewGame(false);
          }

          if (!winner) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to reset the game?")) {
              setTicsArray(
                Array.from({ length: 3 }, () => Array(3).fill(Ticks.Empty))
              );
              setIsNewGame(false);
            }
          }
        }}
      >
        Reset Game
      </button>
    </section>
  );
}

/*Functions*/
/*Functions*/

function LogoAndTurns({ turn, winner, ticsArray }) {
  return (
    <div className="logo-score-container flex">
      <img src={logo} alt="game-logo" />
      {!winner && ticsArray.flat().includes(null) && (
        <div className="score-container flex-row">
          <img src={Ticks[`${turn === 0 ? "O" : "X"}Img`]} alt="player-turn" />
          <p>TURN</p>
        </div>
      )}
    </div>
  );
}

function GameContainer({
  ticsArray,
  targetCell,
  setTargetCell,
  turn,
  winner,
  setWinner,
}) {
  return (
    <div className="game-container">
      <div className="game-grid">
        {ticsArray.flat().map((cell, i) => (
          <div
            className="cell flex"
            key={`cell-${i + 1}`}
            id={`cell-${i + 1}`}
            onClick={() => {
              if (!cell) {
                createChild(i + 1, turn, targetCell);
                setTargetCell(i + 1);
              }
            }}
          >
            {cell !== null && (
              <img
                src={cell === 0 ? Ticks.OImg : Ticks.XImg}
                alt={`cell-${i}-tics`}
                key={`cell-${i}-tics`}
              ></img>
            )}
          </div>
        ))}
      </div>
      {(winner || !ticsArray.flat().includes(null)) && (
        <div className="result-display flex ">
          {winner && (
            <img
              src={Ticks[`${winner === 0 ? "O" : "X"}Img`]}
              alt="player-icon"
            ></img>
          )}
          <p> {winner ? "Wins" : "It's a tie"}</p>
        </div>
      )}
    </div>
  );
}

function createChild(id, turn, targetCell) {
  const div = document.getElementById(`cell-${id}`);
  const targetImg = document.querySelector(`#cell-${targetCell} img`);

  if (targetImg) {
    targetImg.remove();
  }
  if (div.childElementCount < 1) {
    const img = document.createElement("img");
    img.src = Ticks[`${turn === 0 ? "O" : "X"}Img`];
    div.appendChild(img);
  }
}

function handleSaveTic(
  index,
  ticsArray,
  setTicsArray,
  turn,
  targetCell,
  setTargetCell,
  setTurn,
  winner,
  setWinner
) {
  let targetImg = document.querySelector(`#cell-${targetCell} img`);
  if (targetImg) {
    targetImg.remove();
  }

  const row = Math.floor(index / 3);
  const col = index % 3;

  if (ticsArray[row][col] !== Ticks.Empty) return;

  const updatedArray = [...ticsArray];
  updatedArray[row][col] = turn === 0 ? Ticks.O : Ticks.X;

  setTicsArray(updatedArray);
  setTurn(turn === 1 ? 0 : 1);
  setTargetCell(null);

  if (checkTTC(ticsArray)) {
    setWinner(turn);
  }
}
function checkTTC(arrays) {
  const array = arrays;

  for (let i = 0; i < array.length; i++) {
    if (new Set(array[i]).size === 1 && array[i][0] !== Ticks.Empty) {
      return array[i][0];
    }
    if (
      new Set([array[0][i], array[1][i], array[2][i]]).size === 1 &&
      array[0][i] !== Ticks.Empty
    ) {
      return array[0][i];
    }
  }
  if (
    new Set([array[0][0], array[1][1], array[2][2]]).size === 1 &&
    array[0][0] !== Ticks.Empty
  ) {
    return array[0][0];
  }

  if (
    new Set([array[0][2], array[1][1], array[2][0]]).size === 1 &&
    array[0][2] !== Ticks.Empty
  ) {
    return array[0][2];
  }

  return null;
}
