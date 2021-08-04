import {
    Box,
    Button,
    chakra,
    Flex,
    Grid,
    Heading,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"
import { motion, useCycle } from "framer-motion"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import DisclaimerModal from "./components/DisclaimerModal"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { Meeting } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { HoverContextProvider } from "./HoverContext"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { courses as sampleCourse } from "./sampleCourses"
import { useAppContext } from "./SqrlContext"
import { timeToMinuteOffset } from "./utils/time"

// const TimetableContainer = styled(chakra.div)`
//     display: grid;
//     /* width: calc(100vw ); */
//     /* width: 100%; */
//     flex: 1;
//     grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
//     min-height: calc(100vh - 4.5rem);

//     @media print {
//         top: 1rem;
//     }
// `

const Container = styled(chakra.div)`
    position: relative;
    position: relative;
    top: 4.5rem;

    display: flex;
    width: 100vw;
`

const MContainer = React.forwardRef(({ children, ...rest }: any, ref: any) => (
    <Box ref={ref} {...rest}>
        {children}
    </Box>
))

const MotionContainer = motion(MContainer)

const MFlex = React.forwardRef(({ children, ...rest }: any, ref: any) => (
    <Flex ref={ref} {...rest}>
        {children}
    </Flex>
))

const MotionFlex = motion(MFlex)

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

    const [sidebarOpen, toggleSidebarOpen] = useCycle(false, true)

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
            <Button
                position="fixed"
                top="1rem"
                left="1rem"
                zIndex="1000"
                onClick={() => {
                    toggleSidebarOpen()
                }}
            >
                toggle sidebar
            </Button>
            <Container
                width={sidebarOpen ? "calc(100vw - 24rem)" : "100vw"}
                minHeight="calc(100vh - 4.5rem)"
                transition="width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
            >
                <HoverContextProvider>
                    <Grid
                        gridTemplateColumns="repeat(auto-fit, minmax(450px, 1fr))"
                        background={useColorModeValue("gray.75", "gray.800")}
                        flex="1"
                        zIndex="1"
                        boxShadow="0px 0px 6px rgba(0, 0, 0, 0.2)"
                    >
                        {(showSemester === "first" ||
                            showSemester === "both") && (
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
                        {(showSemester === "second" ||
                            showSemester === "both") && (
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
                    </Grid>
                </HoverContextProvider>
            </Container>
            {courses["CSC263H1-S-20219"] && (
                <MotionContainer
                    position="absolute"
                    right="0"
                    width="24rem"
                    top="4.5rem"
                    // boxShadow="0px 0px 6px rgba(0, 0, 0, 0.2)"
                    height="calc(100vh - 4.5rem)"
                    overflowX="hidden"
                    // transition="z-index 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
                    // transitionDelay="0.1s"
                >
                    <Sidebar course={courses["CSC263H1-S-20219"]} />
                </MotionContainer>
            )}
        </div>
    )
}

export default Sqrl
