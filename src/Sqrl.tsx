import {
  Box,
  chakra,
  Flex,
  Grid,
  Heading,
  Icon,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment, useEffect, useState } from "react"
import { GoChevronLeft } from "react-icons/go"
import styled from "styled-components"
import DisclaimerModal from "../components/DisclaimerModal"
import Header from "../components/Header"
import Sidebar from "../components/sidebar/Sidebar"
import { Meeting } from "../components/timetable/Meeting"
import { Timetable } from "../components/timetable/Timetable"
import { HoverContextProvider } from "./HoverContext"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { useAppContext } from "./SqrlContext"
import { timeToMinuteOffset } from "./utils/time"

const Container = styled(chakra.div)`
  position: relative;
  position: relative;
  top: 4.5rem;

  display: flex;
  width: 100vw;
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
    state: { courses, userMeetings, sidebarCourse, hoverMeeting },
  } = useAppContext()

  const [timetableSize, setTimetableSize] = useState(40)
  const [firstMeetings, setFirstMeetings] = useState<Array<Meeting>>([])
  const [secondMeetings, setSecondMeetings] = useState<Array<Meeting>>([])
  const [disclaimed, setDisclaimed] = useState<boolean | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setTimetableSize(scale)
  }, [timetableSize, setTimetableSize, scale])

  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    const meetings = {
      ...userMeetings,
      [hoverMeeting.courseIdentifier]: {
        ...userMeetings[hoverMeeting.courseIdentifier],
        hover: hoverMeeting.meeting,
      },
    }

    setFirstMeetings(MeetingsFabricator(courses, meetings, "FIRST_SEMESTER"))
    setSecondMeetings(MeetingsFabricator(courses, meetings, "SECOND_SEMESTER"))
  }, [setFirstMeetings, setSecondMeetings, courses, userMeetings, hoverMeeting])

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

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (!sidebarCourse) return
    setTransitioning(true)

    setSidebarOpen(() => {
      return true
    })

    setTimeout(() => {
      setTransitioning(false)
    }, 0)
  }, [sidebarCourse])

  useEffect(() => {
    if (localStorage.getItem("disclaimed")) return
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setColorMode("dark")
    }
  }, [setColorMode])

  const { t } = useTranslation("common")

  return (
    <Fragment>
      <DisclaimerModal
        disclosure={{ isOpen, onOpen, onClose }}
        ModalProps={{
          isOpen,
          onClose,
        }}
      />
      <Header setSidebarOpen={setSidebarOpen} />

      <Container
        width={sidebarOpen ? "calc(100vw - 25rem)" : "100vw"}
        minHeight="calc(100vh - 4.5rem)"
        transition="width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
        onTransitionEnd={() => {
          setTransitioning(false)
        }}
      >
        <HoverContextProvider>
          <Grid
            gridTemplateColumns="repeat(auto-fit, minmax(450px, 1fr))"
            background={useColorModeValue("gray.75", "gray.800")}
            flex="1"
            zIndex="1"
            boxShadow="0px 0px 9px -5px rgba(0, 0, 0, 0.3)"
            pointerEvents={transitioning ? "none" : "auto"}
            height="calc(100vh - 4.5rem)"
            overflowY="scroll"
          >
            {(showSemester === "first" || showSemester === "both") && (
              <Flex position="relative">
                <Heading
                  as="h3"
                  size="sm"
                  color="blue.600"
                  fontWeight="800"
                  position="absolute"
                  top={2}
                  left={3}
                >
                  {t("first-semester")}
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
                  top={2}
                  left={3}
                >
                  {t("second-semester")}
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
      <Flex
        position="fixed"
        right="0"
        top="0"
        bottom="0"
        fontSize="1.5rem"
        height="100%"
        pointerEvents="none"
        margin="auto"
        zIndex="1000"
        alignItems="center"
        transform={sidebarOpen ? "translateX(-24rem)" : ""}
        transition="transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
        onClick={() => {
          setTransitioning(true)
          setSidebarOpen((prev) => !prev)
        }}
      >
        <Flex
          as="button"
          pointerEvents="all"
          background={useColorModeValue(
            "rgba(236, 236, 236, 0.6)",
            "rgba(0,0,0,0.6)"
          )}
          p={2}
          height="2rem"
          width="2rem"
          borderRadius="1000rem"
          justifyContent="center"
          alignItems="center"
          // opacity={0.7}
          boxShadow="1px 1px 8px -2px rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(1px)"
          _hover={{
            backdropFilter: "none",
            // opacity: "0.5",
          }}
        >
          <Icon
            as={GoChevronLeft}
            transform={sidebarOpen ? "translateX(1px) rotate(180deg)" : ""}
            transition="transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
          />
        </Flex>
      </Flex>
      <Box
        position="absolute"
        right="0"
        width="25rem"
        top="4.5rem"
        height="calc(100vh - 4.5rem)"
        overflowX="hidden"
      >
        <Sidebar />
      </Box>
    </Fragment>
  )
}

export default Sqrl
