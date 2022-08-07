import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Note from "../components/Note"
import userEvent from "@testing-library/user-event"

test("renders content", async () => {
  const note = {
    content: "Component testing is done",
    importance: true,
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  //   const element = screen.getByText("Component testing is done")
  //   expect(element).toBeDefined()

  // find it by class
  // const { container } = render(<Note note={note} />)
  // const div = container.querySelector(".note")
  // expect(div).toHaveTextContent("Component testing is done")

  // testing the button in the component
  const user = userEvent.setup()
  const button = screen.getByText("make note important")
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  //   screen.debug()
  // this will print the HTML to the terminal
})
