// Component for creating a dynamic board with an array that holds three values
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    return (
        // Creating the board with the map method and list items. 
        // Each list item must have a key so it can be identified. 
        // Using rowIndex for this case is fine. However, if items were to change position, it would be a problem since the index would change. 
        // Logic for 3x3 game board below
        <ol id="game-board">
            {initialGameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol >

    )
};
