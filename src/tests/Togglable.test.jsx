import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import Togglable from "../components/Togglable"

// creates a block that groups together multiple tests
describe("Togglable", () => {
  let container
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  test("renders its children", async () => {
    await screen.findAllByText("togglable content")
  })

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    await user.click(button)

    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
  })

  test("after clicking cancel, children are hidden", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    const cancelButton = screen.getByText("Cancel")
    await user.click(button)
    await user.click(cancelButton)

    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })
})
