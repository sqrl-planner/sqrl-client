import { chakra, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { Meeting } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { courses as sampleCourse } from "./sampleCourses"
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
        sampleCourse.forEach((course) => {
            disptachAppContext({ type: "ADD_COURSE", payload: course })
        })
    }, [disptachAppContext])

    useEffect(() => {
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "CSC258H1", lecture: "LEC-0101" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "MAT237Y1", lecture: "LEC-0201" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "CSC236H1", lecture: "LEC-0201" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "STA247H1", lecture: "LEC-0101" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "CSC207H1", lecture: "LEC-0301" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "CSC207H1", tutorial: "TUT-0301" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "MAT237Y1", tutorial: "TUT-0301" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "STA247H1", tutorial: "TUT-5103" },
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
                    top: "4.5rem",
                    display: "flex",
                    minHeight: "calc(100vh - 4.5rem)",
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
