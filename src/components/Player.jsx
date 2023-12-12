import { useState } from "react";
export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  //   Handling a click on name edit button
  function handleEditClick() {
    setIsEditing(true);
  }
  //   Storing the default player name in playerName
  let playerName = <span className="player-name"> {name}</span>;

  //   If statement in case button is clicked (true)
  if (isEditing) {
    // Changing player 1 to an input field which is required
    playerName = <input type="text" required />;
  }
  return (
    <li>
      <span className="player">
        {/* Rendering playerName */}
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>Edit</button>
    </li>
  );
}
