import { render, screen } from "@testing-library/react"
import Home from "../src/pages/_index"
import "@testing-library/jest-dom"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />)

    const heading = screen.getByText(/preferences/)

    expect(heading).toBeInTheDocument()
  })
})
