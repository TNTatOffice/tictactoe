import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
// Creating game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Creating a helper function to derive the active player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// Helper function for deriving the winner
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // Check if the squares are not null
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // Setting winner to the symbol of the first square
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

// Helper function for deriving the game board
function deriveGameboard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  // Using a for loop to run through all turns using "const turn of turns". Turns is an empty array.
  // We are pulling square and player properties from App and assigning them to turn. Then pulling row and col and assigning them to square.
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    // Deriving state to from gameBoard row and col to player.
    gameBoard[row][col] = player;
  }
  return gameBoard
}

function App() {
  // Using a state to pull player names for X and O pulled from PLAYERS above
  const [players, setPlayers] = useState(PLAYERS);
  // Managing the Log of turns by lifting the state up. The log is an array of data that constantly grows.
  // Whenever a square is selected on the grid, we want to add a new turn to the array.
  // Managing the active player by lifting the state up. App has access to both player and game board.
  // Handle select square is passed on to GameBoard as a prop. In GameBoard, we accept it as a prop in onSelectSquare
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  // Deriving the game board from the helper function above
  const gameBoard = deriveGameboard(gameTurns)
  // When a new state depends on the old state (like switching turns), we need to pass a function to the Set.curActivePlayer (the existing state) is passed as default
  // handleSelectSquare switches the active player
  // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  // Deriving winner from gameTurns with a for loop to run through all combinations of winning combinations

  // Setting gameBoard to initial game board and then updating it if we have turns.
  // If there are no turns, the game board stays as it is
  // ERROR- when the game board is set, it is fixed in memory and cannot be reset. Therefore, we are creating a new gameboard by mapping the board and all arrays. This gives us a plain new board and not the one from memory.

  // Deriving the winner from the helper function above
  const winner = deriveWinner(gameBoard, players);
  // Checking for a draw if we had nine turns with no winner
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // Setting current player to X and using an if condition to check it if is X. If not, set currentPlayer to O.
    // Since the first turn equals default (X), we want to check whether the length of the previous turns is greater than 0, which means the turn has changed.
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // Restarting the game by setting GameTurns to an empty array. GameOver component accepts a prop called onRestart that calls handleRestart.
  // onRestart is passed as a prop to GameOver and is executed on the button click
  function handleRestart() {
    setGameTurns([]);
  }

  // using a function to update the name of each player. 
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        {/* IMPORTING PLAYER COMPONENT */}
        <ol id="players" className="highlight-player">
          {/* Passing the isActive prop to player if isActiev is X or O. The state is updated above in setActivePlayer */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* Check if winner is true or if draw. Added () to ensure its checked first*/}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
