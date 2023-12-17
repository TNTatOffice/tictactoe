export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {/* Showing winner if winner is set */}
      {winner && <p>{winner} has won!</p>}
      {/* Showind a draw if there is no winner */}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}
