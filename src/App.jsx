import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  // Managing the Log of turns by lifting the state up. The log is an array of data that constantly grows.
  // Whenever a square is selected on the grid, we want to add a new turn to the array.
  const [gameTurns, setGameTurns] = useState([]);
  // Managing the active player by lifting the state up. App has access to both player and game board.
  // Handle select square is passed on to GameBoard as a prop. In GameBoard, we accept it as a prop in onSelectSquare
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    // When a new state depends on the old state (like switching turns), we need to pass a function to the Set.curActivePlayer (the existing state) is passed as default
    // handleSelectSquare switches the active player
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      // Setting current player to X and using an if condition to check it if is X. If not, set currentPlayer to O.
      // Since the first turn equals default (X), we want to check whether the length of the previous turns is greater than 0, which means the turn has changed.
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        {/* IMPORTING PLAYER COMPONENT */}
        <ol id="players" className="highlight-player">
          {/* Passing the isActive prop to player if isActiev is X or O. The state is updated above in setActivePlayer */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
