import { render } from "@testing-library/react"
import { Timetable } from "./Timetable"
import { HoverContextProvider } from "../../src/HoverContext"
import { AppContextProvider } from "../../src/SqrlContext"
import { PreferencesProvider } from "../../src/PreferencesContext"
import { Meeting, MeetingCategoryType, MeetingDeliveryMode } from "./Meeting"
import { Day } from "../../src/utils/time"

describe("Timetable", () => {
  it("renders the contents", () => {
    const { getByText } = render(
      <AppContextProvider>
        <HoverContextProvider>
          <PreferencesProvider>
            <Timetable
              meetings={[
                new Meeting(
                  Day.WEDNESDAY,
                  720,
                  780,
                  "PDC220H1",
                  0,
                  MeetingDeliveryMode.InPerson,
                  MeetingCategoryType.Lecture,
                  "0201",
                  "PDC220H1-F-20229"
                ),
              ]}
            />
          </PreferencesProvider>
        </HoverContextProvider>
      </AppContextProvider>
    )

    expect(getByText("H1")).toBeInTheDocument()
    expect(getByText("PDC", { exact: false })).toBeInTheDocument()
    expect(getByText("220", { exact: false })).toBeInTheDocument()
  })
})
