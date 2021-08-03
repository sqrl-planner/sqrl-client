import {
    chakra,
    Flex,
    Heading,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import DisclaimerModal from "./components/DisclaimerModal"
import Header from "./components/Header"
import { Meeting } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { HoverContextProvider } from "./HoverContext"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { courses as sampleCourse } from "./sampleCourses"
import { useAppContext } from "./SqrlContext"
import { timeToMinuteOffset } from "./utils/time"

const Container = styled(chakra.div)`
    position: relative;
    top: 4.5rem;
    display: grid;
    width: 100vw;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    min-height: calc(100vh - 4.5rem);

    @media print {
        top: 1rem;
    }
`

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
        dispatch,
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
        for (const [identifier, course] of Object.entries(sampleCourse)) {
            dispatch({ type: "ADD_COURSE", payload: { identifier, course } })
        }

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC258H1-F-20219",
                meeting: "LEC-0101",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "MAT237Y1-Y-20219",
                meeting: "LEC-0201",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC236H1-F-20219",
                meeting: "LEC-0201",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC207H1-F-20219",
                meeting: "LEC-0301",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "STA247H1-F-20219",
                meeting: "LEC-0101",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "MAT224H1-S-20219",
                meeting: "LEC-0101",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC209H1-S-20219",
                meeting: "LEC-0101",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC263H1-S-20219",
                meeting: "LEC-0201",
                method: "lecture",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC207H1-F-20219",
                meeting: "TUT-0301",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "MAT237Y1-Y-20219",
                meeting: "TUT-0301",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "STA247H1-F-20219",
                meeting: "TUT-5103",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "MAT224H1-S-20219",
                meeting: "TUT-0203",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC209H1-S-20219",
                meeting: "TUT-0101",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_MEETING",
            payload: {
                identifier: "CSC263H1-S-20219",
                meeting: "TUT-0201",
                method: "tutorial",
            },
        })

        dispatch({
            type: "SET_CAMPUS",
            payload: { campus: "sg", status: true },
        })

        dispatch({
            type: "ADD_PROGRAM",
            payload: {
                code: "ASSPE1689",
                title: "Computer Science Specialist",
            },
        })

        dispatch({
            type: "ADD_PROGRAM",
            payload: {
                code: "ASFOC1689B",
                title: "Focus in Artificial Intelligence",
            },
        })
    }, [dispatch])

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
            <Container background={useColorModeValue("gray.75", "gray.800")}>
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
            </Container>
        </div>
    )
}

export default Sqrl
