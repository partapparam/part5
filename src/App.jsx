import "./App.css"
import React from "react"
import Note from "./components/Note"
import { useState, useEffect, useRef } from "react"
import Phonebook from "./components/Phonebook"
import Countries from "./components/Countries"
import noteService from "./service/notes"
import Notification from "./components/Notification"
import loginService from "./service/login"
import Togglable from "./components/Togglable"
import LoginForm from "./components/Login"
import NoteForm from "./components/NoteForm"

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  const hook = () => {
    console.log("effect")
    noteService.getAll().then((initialData) => {
      // console.log(response)
      setNotes(initialData)
    })
  }
  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3002/notes/${id}`
    const note = notes.find((n) => n.id === id)
    // spread operator copies the note, than we change the important value in that object
    // we create a clone note rather then passing in the existing note because we do not mutate state directly in React
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        // use map to create a copy of the old note into the new array SetNotes, plus the new note we just get back from response
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note ${changedNote.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (e) => {
    e.preventDefault()
    console.log("button clicked", e.target)
    // create new note object
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (err) {
      setErrorMessage("WRong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}
      {/* this is same as using the conditional operator 
        true && expression always === expression so the expression renders
        false && expression always === false so nothing renders because react will ignore it
      */}
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>
      <div>
        <Phonebook />
      </div>
      {/* <Countries /> */}
    </div>
  )
}

export default App
