import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"

test("renders learn react link", () => {
    render(<App />)
    const linkElement = screen.getByText(/Sqrl/i)
    expect(linkElement).toBeInTheDocument()
})
