import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  // Managing the active player by lifting the state up. App has access to both player and game board.
  // Handle select square is passed on to GameBoard as a prop. In GameBoard, we accept it as a prop in onSelectSquare
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    // When a new state depends on the old state (like switching turns), we need to pass a function to the Set.curActivePlayer (the existing state) is passed as default
    // handleSelectSquare switches the active player
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
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

        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;
