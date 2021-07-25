import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { usePreferences } from "./PreferencesContext"
import { timeToMinuteOffset } from "./utils/time"

const Sqrl = () => {
    const {
        state: {
            scale,
            start,
            end,
            showTimeInMeeting,
            palette,
            highlightConflicts,
        },
        dispatch,
    } = usePreferences()

    const [timetableSize, setTimetableSize] = useState(48)

    useEffect(() => {
        let size: number = 48

        if (scale === "compact") size = 20
        if (scale === "normal") size = 48
        if (scale === "tall") size = 100

        setTimetableSize(size)
    }, [timetableSize, setTimetableSize, scale])

    return (
        <div>
            <Header />
            <div
                style={{
                    position: "relative",
                    top: "5rem",
                }}
            >
                <Timetable
                    meetings={EXAMPLE_MEETINGS}
                    scale={timetableSize}
                    minTime={timeToMinuteOffset(start)}
                    maxTime={timeToMinuteOffset(end)}
                    palette={palette}
                    highlightConflicts={highlightConflicts}
                />
            </div>
        </div>
    )
}

export default Sqrl
