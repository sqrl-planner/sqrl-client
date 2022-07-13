import { render } from "@testing-library/react"
import SearchView from "./SearchView"
import { HoverContextProvider } from "../../../src/HoverContext"
import { AppContextProvider } from "../../../src/SqrlContext"
import { PreferencesProvider } from "../../../src/PreferencesContext"
import { MockedProvider } from "@apollo/client/testing"

describe("Search view", () => {
  it("renders correctly", () => {
    render(
      <AppContextProvider>
        <HoverContextProvider>
          <PreferencesProvider>
            <MockedProvider>
              <SearchView
                searchQuery=""
                setSearchQuery={() => {}}
                searchOffset={0}
                setSearchOffset={() => {}}
                chosenCourse=""
                setChosenCourse={() => {}}
              />
            </MockedProvider>
          </PreferencesProvider>
        </HoverContextProvider>
      </AppContextProvider>
    )
  })

  it("should render the search query", () => {
    const { getByDisplayValue } = render(
      <AppContextProvider>
        <HoverContextProvider>
          <PreferencesProvider>
            <MockedProvider>
              <SearchView
                searchQuery="qwerty-query"
                setSearchQuery={() => {}}
                searchOffset={0}
                setSearchOffset={() => {}}
                chosenCourse=""
                setChosenCourse={() => {}}
              />
            </MockedProvider>
          </PreferencesProvider>
        </HoverContextProvider>
      </AppContextProvider>
    )

    expect(getByDisplayValue("qwerty-query")).toBeInTheDocument()
  })
})
