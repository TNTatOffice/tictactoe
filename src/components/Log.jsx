export default function Log({ turns }) {
  return (
    <ol id="log">
      {/* Mapping turns to a list */}
      {/* When outputing a dynamic list, always add a key so each value has an access point */}
      {/* Using JS template literal syntax with `` to create a string that injects values with ${}*/}
      {turns.map((turn) => (
        <li key={`${turn.square.row},${turn.square.col}`}>
          {turn.player} selected ({turn.square.row}, {turn.square.col})
        </li>
      ))}
    </ol>
  );
}
