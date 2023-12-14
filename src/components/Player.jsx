import { useState } from "react";
export default function Player({ initialName, symbol }) {
  // using a second useState to accept tha changed player name
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Handling a click on name edit button- using a FUNCTION. This is recommended by the React team as it ensures we will receive the latest value
  // Editing will dynamically accept the value thanks to the !ediging condition - take the opposite value: true or false
  // Using only !isEditing only schedules the activity to take place
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  // Creating a function that will handle the change in player name event
  // Any key typed in the field box will be an event. This is why we are accepting an event in the handleChange function
  // It accepts the event as an event object
  function handleChange(event) {
    // event.target.value gives us access to what the user entered. Event = the event, target = where it happened, value = what happened
    setPlayerName(event.target.value)
  }
  //   Storing the default player name in playerName
  let editablePlayerName = <span className="player-name"> {playerName}</span>;
  //   If statement in case button is clicked (true)
  if (isEditing) {
    // Changing player 1 to an input field which is required. Using Value prop to set the value that is shown
    // Using onChange event to record a change in player name. Calling the {handleChange} function to update the State
    // Getting data from user and feeding it back = two way binding
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <li>
      <span className="player">
        {/* Rendering playerName */}
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Creating a ternary expression to change the button from Edit to Save if clicked */}
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
