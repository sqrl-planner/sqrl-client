// import "@testing-library/jest-dom"
require("@testing-library/jest-dom")
// import { unmountComponentAtNode } from "react-dom"

// import fetchMock from "jest-fetch-mock"
const fetchMock = require("jest-fetch-mock")
fetchMock.enableMocks()

jest.mock("react-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        }
    },
}))
// let container = null
// beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div")
//     document.body.appendChild(container)
// })

// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container)
//     container.remove()
//     container = null
// })
