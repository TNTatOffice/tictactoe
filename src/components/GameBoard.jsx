import { useState } from "react";
// Component for creating a dynamic board with an array that holds three values
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  // Using state to update the game board with the user input. It accepts the initial board as a value.
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // Updating the game board with the previous state of the board, so we don't lose the previous user input
  // This can be done by passing a function
  // The function accepts the rowIndex and colIndex to know which null to update
  // If the state is an object or array, the state needs to be updated with a copy (immutable), instead of changing the original
  // Creating a copy of the array to update it instead of the original
  // The spread operator is used to paste all existing values on the board
  // Using map to load all existing values in the array. Created a brand new array full of nested arrays that store the data as they did before
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });
    // Executing onSelectSquare = handleSelectSquare from App
    onSelectSquare();
  }
  return (
    // Creating the board with the map method and list items.
    // Each list item must have a key so it can be identified.
    // Using rowIndex for this case is fine. However, if items were to change position, it would be a problem since the index would change.
    // Logic for 3x3 game board below
    <ol id="game-board">
      {/* Mapping the new game board after updating state with OnClick. See below */}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Passing an annonymous function to onClick since we want rowIndex and colIndex as arguments */}
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
