import { chakra, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { usePreferences } from "./PreferencesContext"
import { Day, timeToMinuteOffset, WEEK_DAYS } from "./utils/time"

const Sqrl = () => {
    const {
        state: {
            scale,
            start,
            end,
            palette,
            highlightConflicts,
            twentyFour,
            emphasize,
        },
    } = usePreferences()

    const [timetableSize, setTimetableSize] = useState(40)

    useEffect(() => {
        setTimetableSize(scale)
    }, [timetableSize, setTimetableSize, scale])

    const { colorMode } = useColorMode()

    return (
        <div>
            <Header />
            <chakra.div
                style={{
                    position: "relative",
                    // backgroundColor: "black",
                    top: "4.5rem",
                    display: "flex",
                    minHeight: "calc(100vh - 4.5rem)",
                    // width: "50vw",
                    // overflow: "hidden",
                }}
                background={useColorModeValue("gray.75", "gray.800")}
            >
                <Timetable
                    meetings={EXAMPLE_MEETINGS}
                    scale={timetableSize}
                    minTime={timeToMinuteOffset(start)}
                    maxTime={timeToMinuteOffset(end)}
                    palette={palette}
                    highlightConflicts={highlightConflicts}
                    twentyFour={twentyFour}
                    dark={colorMode === "dark"}
                    emphasizeOnHover={emphasize}
                />
            </chakra.div>
        </div>
    )
}

export default Sqrl
