import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import NoteForm from "../components/NoteForm"
import userEvent from "@testing-library/user-event"

test("NoteForm", async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByPlaceholderText("note name")
  const importantInput = screen.getByPlaceholderText("important")
  const button = screen.getByText("Save")

  await user.type(input, "testing a form")
  await user.type(importantInput, "yes")
  await user.click(button)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe("testing a form")
  expect(createNote.mock.calls[0][0].important).toBe("yes")
})
