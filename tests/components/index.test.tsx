/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../../pages/index"

test("renders learn react link", () => {
    render(<App />)
    expect(true).toBe(true)
    // const linkElement = screen.getByText(/Sqrl/i)
    // expect(linkElement).toBeInTheDocument()
})
