import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Persons from "../components/Persons"

test("renders Persons", async () => {
  const person = {
    name: "person",
    number: "1234",
  }
  const mockHandler = jest.fn()

  render(<Persons person={person} deleteProps={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText("delete")
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
