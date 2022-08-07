import React from "react"

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "note is important" : "make note important"
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
