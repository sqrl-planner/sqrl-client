import {
    chakra,
    Flex,
    Heading,
    useColorMode,
    useColorModeValue,
    useDisclosure,
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
import DisclaimerModal from "./components/DisclaimerModal"

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
            showSemester,
        },
    } = usePreferences()

    const {
        state: { courses, userMeetings },
        dispatch: disptachAppContext,
    } = useAppContext()

    const [timetableSize, setTimetableSize] = useState(40)
    const [firstMeetings, setFirstMeetings] = useState<Array<Meeting>>([])
    const [secondMeetings, setSecondMeetings] = useState<Array<Meeting>>([])
    const [disclaimed, setDisclaimed] = useState<boolean | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

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

    useEffect(() => {
        const lsDisclaimed = localStorage.getItem("disclaimed")

        if (lsDisclaimed) {
            setDisclaimed(JSON.parse(lsDisclaimed) as boolean)
        }
    }, [disclaimed, setDisclaimed])

    useEffect(() => {
        if (!disclaimed) onOpen()
        if (disclaimed) onClose()
    }, [disclaimed, onOpen, onClose])

    return (
        <div>
            <DisclaimerModal
                disclosure={{ isOpen, onOpen, onClose }}
                ModalProps={{
                    isOpen,
                    onClose,
                }}
            />
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
                    {(showSemester === "first" || showSemester === "both") && (
                        <Flex position="relative">
                            <Heading
                                as="h3"
                                size="sm"
                                color="blue.600"
                                fontWeight="800"
                                position="absolute"
                                top={3}
                                left={3}
                            >
                                1<sup>st</sup>
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
                    )}
                    {(showSemester === "second" || showSemester === "both") && (
                        <Flex position="relative">
                            <Heading
                                as="h3"
                                size="sm"
                                color="green.600"
                                fontWeight="800"
                                position="absolute"
                                top={3}
                                left={3}
                            >
                                2<sup>nd</sup>
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
                    )}
                </HoverContextProvider>
            </chakra.div>
        </div>
    )
}

export default Sqrl
