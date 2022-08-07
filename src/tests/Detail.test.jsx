import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Detail from "../components/Detail"

test("renders detail", () => {
  const country = {
    name: {
      common: "country name",
    },
    capital: ["country capitol"],
  }

  const { container } = render(<Detail country={country} />)
  const div = container.querySelector(".country")

  //   screen.debug()

  expect(div).toHaveTextContent("country name")
  expect(div).toHaveTextContent("country capitol")
})
