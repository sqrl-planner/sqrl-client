import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

import Home from "../src/pages/_index"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />)

    const heading = screen.getByText(/preferences/)

    expect(heading).toBeInTheDocument()
  })
})
