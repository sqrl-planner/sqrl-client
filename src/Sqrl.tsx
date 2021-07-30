import { chakra, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { Meeting } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { courseOne, courseTwo, courseThree } from "./Course"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { useAppContext } from "./SqrlContext"
import { timeToMinuteOffset } from "./utils/time"

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

    const {
        state: { courses, userMeetings },
        dispatch: disptachAppContext,
    } = useAppContext()

    const [timetableSize, setTimetableSize] = useState(40)
    const [meetings, setMeetings] = useState<Array<Meeting>>([])

    useEffect(() => {
        setTimetableSize(scale)
    }, [timetableSize, setTimetableSize, scale])

    const { colorMode } = useColorMode()

    useEffect(() => {
        disptachAppContext({ type: "ADD_COURSE", payload: courseOne })
        disptachAppContext({ type: "ADD_COURSE", payload: courseTwo })
        disptachAppContext({ type: "ADD_COURSE", payload: courseThree })
        console.log("dispatched")
    }, [disptachAppContext])

    useEffect(() => {
        disptachAppContext({
            type: "ADD_LECTURE",
            payload: { course: "51272", lecture: "LEC-9901" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL",
            payload: { course: "51272", tutorial: "TUT-0101" },
        })
        disptachAppContext({
            type: "ADD_LECTURE",
            payload: { course: "52579", lecture: "LEC-5101" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL",
            payload: { course: "54578", tutorial: "TUT-0101" },
        })
    }, [disptachAppContext])

    useEffect(() => {
        setMeetings(MeetingsFabricator(courses, userMeetings))
    }, [setMeetings, courses, userMeetings])

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
                    meetings={meetings}
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
