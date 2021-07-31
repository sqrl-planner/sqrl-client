import {
    chakra,
    Flex,
    Heading,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { Meeting } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { courses as sampleCourse } from "./sampleCourses"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { useAppContext } from "./SqrlContext"
import { timeToMinuteOffset } from "./utils/time"
import { HoverContextProvider } from "./HoverContext"

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
    const [firstMeetings, setFirstMeetings] = useState<Array<Meeting>>([])
    const [secondMeetings, setSecondMeetings] = useState<Array<Meeting>>([])

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
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "MAT224H1", lecture: "LEC-0101" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "CSC209H1", lecture: "LEC-0101" },
        })
        disptachAppContext({
            type: "ADD_LECTURE_BY_COURSE_NAME",
            payload: { courseName: "CSC263H1", lecture: "LEC-0201" },
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
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "MAT224H1", tutorial: "TUT-0203" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "CSC209H1", tutorial: "TUT-0101" },
        })
        disptachAppContext({
            type: "ADD_TUTORIAL_BY_COURSE_NAME",
            payload: { courseName: "CSC263H1", tutorial: "TUT-0201" },
        })
    }, [disptachAppContext])

    useEffect(() => {
        setFirstMeetings(MeetingsFabricator(courses, userMeetings, "F"))
        setSecondMeetings(MeetingsFabricator(courses, userMeetings, "S"))
    }, [setFirstMeetings, setSecondMeetings, courses, userMeetings])

    return (
        <div>
            <Header />
            <chakra.div
                style={{
                    position: "relative",
                    top: "4.5rem",
                    display: "grid",
                    width: "100vw",
                    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                    minHeight: "calc(100vh - 4.5rem)",
                }}
                background={useColorModeValue("gray.75", "gray.800")}
            >
                <HoverContextProvider>
                    <Flex flexDirection="column" alignItems="center">
                        <Heading as="h3" size="md" my={2} mt={4}>
                            First
                        </Heading>
                        <Timetable
                            meetings={firstMeetings}
                            scale={timetableSize}
                            minTime={timeToMinuteOffset(start)}
                            maxTime={timeToMinuteOffset(end)}
                            palette={palette}
                            highlightConflicts={highlightConflicts}
                            twentyFour={twentyFour}
                            dark={colorMode === "dark"}
                            emphasizeOnHover={emphasize}
                        />
                    </Flex>
                    <Flex flexDirection="column" alignItems="center">
                        <Heading as="h3" size="md" my={2} mt={4}>
                            Second
                        </Heading>
                        <Timetable
                            meetings={secondMeetings}
                            scale={timetableSize}
                            minTime={timeToMinuteOffset(start)}
                            maxTime={timeToMinuteOffset(end)}
                            palette={palette}
                            highlightConflicts={highlightConflicts}
                            twentyFour={twentyFour}
                            dark={colorMode === "dark"}
                            emphasizeOnHover={emphasize}
                        />
                    </Flex>
                </HoverContextProvider>
            </chakra.div>
        </div>
    )
}

export default Sqrl
