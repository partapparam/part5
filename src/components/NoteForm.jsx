import React, { useState } from "react"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("")
  const [important, setImportant] = useState("")

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const importantChange = (e) => {
    setImportant(e.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: important,
    })

    setNewNote("")
    setImportant("")
  }

  return (
    <div className="formDiv">
      <h2>Create a new Note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="note name"
          value={newNote}
          onChange={handleChange}
        />
        <input
          type="text"
          value={important}
          placeholder="important"
          onChange={importantChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm
