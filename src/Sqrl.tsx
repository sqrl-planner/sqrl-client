import { useLazyQuery, useQuery } from "@apollo/client"
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
  useToast,
} from "@chakra-ui/react"
import { log } from "console"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { Fragment, useEffect, useMemo, useState } from "react"
import { GoChevronLeft } from "react-icons/go"
import styled from "styled-components"
import DisclaimerModal from "../components/DisclaimerModal"
import Header from "../components/Header"
import Sidebar from "../components/sidebar/Sidebar"
import { Meeting } from "../components/timetable/Meeting"
import { Timetable } from "../components/timetable/Timetable"
import { GET_COURSE_BY_ID } from "../operations/queries/getCourseById"
import { GET_COURSES_BY_ID } from "../operations/queries/getCoursesById"
import { Course } from "./Course"
import { HoverContextProvider } from "./HoverContext"
import MeetingsFabricator from "./MeetingsFabricator"
import { usePreferences } from "./PreferencesContext"
import { useAppContext, UserMeeting } from "./SqrlContext"
import useCourses from "./useCourses"
import useTimetable from "./useTimetable"
import { getMeetingsFromSections } from "./utils/course"
import { timeToMinuteOffset } from "./utils/time"

const Container = styled(chakra.div)`
  position: relative;
  position: relative;
  top: 4.5rem;

  display: flex;
  width: 100vw;
`

type Props = {
  sections: { [key: string]: Array<string> }
}

const Sqrl = ({ sections }: Props) => {
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
    state: { hoverMeeting, sidebarCourse },
  } = useAppContext()

  const { courses, userMeetings } = useCourses({ sections })

  const [timetableSize, setTimetableSize] = useState(40)

  const router = useRouter()

  const { allowedToEdit } = useTimetable({
    id: (router.query.id as string) || "",
  })

  useEffect(() => {
    setTimetableSize(scale)
  }, [timetableSize, setTimetableSize, scale])

  const { colorMode, setColorMode } = useColorMode()

  const meetings = useMemo(() => {
    const memoizedMeetings = {
      ...userMeetings,
      [hoverMeeting.courseIdentifier]: {
        ...userMeetings[hoverMeeting.courseIdentifier],
        hover: hoverMeeting.meeting,
      },
    }

    return memoizedMeetings
  }, [userMeetings, hoverMeeting])

  const firstMeetings = useMemo<Array<Meeting>>(
    () => MeetingsFabricator(courses, meetings, "FIRST_SEMESTER"),
    [courses, meetings]
  )
  const secondMeetings = useMemo<Array<Meeting>>(
    () => MeetingsFabricator(courses, meetings, "SECOND_SEMESTER"),
    [courses, meetings]
  )

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

  const { t } = useTranslation("common")

  return (
    <Fragment>
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
                  left={2}
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
                  left={2}
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
      {allowedToEdit && (
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
      )}
      {allowedToEdit && (
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
      )}
    </Fragment>
  )
}

export default Sqrl
