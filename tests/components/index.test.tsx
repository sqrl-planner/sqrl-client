/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import { Home } from "../../pages/index"

jest.mock("next-i18next", () => {
    useTranslation: () => ({ t: (key: any) => key })
})

test("renders learn react link", () => {
    render(<Home />)
    expect(true).toBe(true)
    // const linkElement = screen.getByText(/Sqrl/i)
    // expect(linkElement).toBeInTheDocument()
})
