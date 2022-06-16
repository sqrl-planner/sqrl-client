import {
  AddIcon,
  CheckIcon,
  QuestionIcon,
  WarningIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons"
import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { Fragment, useEffect } from "react"
import { FaInternetExplorer, FaTrashAlt } from "react-icons/fa"
import { Course } from "../../src/Course"
import MeetingsFabricator from "../../src/MeetingsFabricator"
import { useAppContext, UserMeeting } from "../../src/SqrlContext"
import useCourses from "../../src/useCourses"
import useTimetable from "../../src/useTimetable"
import useSections from "../../src/useSections"
import { breakdownCourseCode } from "../../src/utils/course"
import {
  Meeting,
  MeetingCategoryType,
  MeetingGroup,
  partitionMeetingsByDay,
} from "../timetable/Meeting"
import { CourseSubheading } from "./OverviewView"

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean | any
  wrapper: any
  children: React.ReactNode
}) => (condition ? wrapper(children) : children)

const MeetingPicker = ({
  method,
  course,
  scrolling = false,
}: {
  method: MeetingCategoryType
  course: Course
  scrolling?: boolean
}) => {
  const pillTextColour = useColorModeValue("gray.800", "gray.100")
  const pillColour = useColorModeValue("gray.75", "gray.700")
  const activePillTextColour = useColorModeValue("green.700", "green.100")
  const activePillColour = useColorModeValue("green.100", "green.700")

  const conflictPillTextColour = useColorModeValue("red.700", "red.100")

  const concerningPillTextColour = useColorModeValue("yellow.700", "yellow.100")
  // const waitlistPillColour = useColorModeValue("yellow.100", "yellow.900")

  const boxShadowColour = useColorModeValue(
    "rgba(0,0,0,0.5)",
    "rgba(255, 255, 255, 0.5)"
  )

  const hoverBackground = useColorModeValue("gray.100", "gray.600")

  const {
    state: { sidebarCourse: identifier },
    dispatch,
  } = useAppContext()

  const router = useRouter()
  const { sections, setSections } = useSections()
  const { courses, userMeetings } = useCourses({ sections })

  useTimetable({ id: (router.query.id as string) || "" })

  const matchingMethods: typeof course.sections = course.sections.filter(
    (meeting) => meeting.teachingMethod.toUpperCase() === method.toUpperCase()
  )

  const { t } = useTranslation("sidebar")

  if (!matchingMethods.length) return <Fragment />

  return (
    <Box
      // px={5}
      pointerEvents={scrolling ? "none" : "auto"}
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <CourseSubheading px={5}>{t(method)}</CourseSubheading>
        <button
          disabled={
            !(userMeetings[identifier] && userMeetings[identifier][method])
          }
          onClick={() => {
            // dispatch({
            //   type: "REMOVE_MEETING",
            //   payload: {
            //     identifier,
            //     method,
            //   },
            // })
          }}
        >
          <Icon
            as={FaTrashAlt}
            position="relative"
            top={1.5}
            fontSize="sm"
            pl={0.5}
            mr={7}
            opacity={
              userMeetings[identifier] && userMeetings[identifier][method]
                ? ""
                : "0.5"
            }
          />
        </button>
      </Flex>
      <VStack spacing={0}>
        {matchingMethods.map((section) => {
          const sectionCode = section.code
          const isSelected =
            userMeetings[identifier] &&
            userMeetings[identifier][method] === sectionCode

          // A section is concerning if it is waitlisting or it has no waitlist and is fully enrolled
          let concerning = !!parseInt((section?.actualWaitlist as string) || "")

          if (section?.enrolmentCapacity === section?.actualEnrolment)
            concerning = true

          // for(const [])
          const newUserMeetings = {
            [course.id]: {
              [method]: section.code,
            } as UserMeeting,
          }

          const newMeetingsFirst = MeetingsFabricator(
            courses,
            newUserMeetings,
            "FIRST_SEMESTER"
          )
          const newMeetingsSecond = MeetingsFabricator(
            courses,
            newUserMeetings,
            "SECOND_SEMESTER"
          )

          const currentMeetingsFirst = MeetingsFabricator(
            courses,
            { ...userMeetings },
            "FIRST_SEMESTER"
          )

          const currentMeetingsSecond = MeetingsFabricator(
            courses,
            { ...userMeetings },
            "SECOND_SEMESTER"
          )

          const groupsFirst = partitionMeetingsByDay([
            ...newMeetingsFirst,
            ...currentMeetingsFirst,
          ])
          const groupsSecond = partitionMeetingsByDay([
            ...newMeetingsSecond,
            ...currentMeetingsSecond,
          ])

          const conflicts = new Map()

          const detectConflicts = (
            group: MeetingGroup,
            newMeeting: Meeting
          ) => {
            if (
              group.meetings.length > 1 &&
              group.meetings.filter(
                (meeting: Meeting) =>
                  meeting.getUniqueKey() === newMeeting.getUniqueKey()
              ).length
            ) {
              for (const m of group.meetings) {
                const key = m.getUniqueKey()
                if (
                  m.identifier === newMeeting.identifier &&
                  m.category === newMeeting.category
                )
                  continue
                if (key !== newMeeting.getUniqueKey()) {
                  conflicts.set(key, m)
                }
              }
            }
          }

          if (course.term === "FIRST_SEMESTER" || course.term === "FULL_YEAR") {
            for (const newMeeting of newMeetingsFirst) {
              for (const group of groupsFirst.get(newMeeting.day) as any) {
                detectConflicts(group, newMeeting)
              }
            }
          }

          if (
            course.term === "SECOND_SEMESTER" ||
            course.term === "FULL_YEAR"
          ) {
            for (const newMeeting of newMeetingsSecond) {
              for (const group of groupsSecond.get(newMeeting.day) as any) {
                detectConflicts(group, newMeeting)
              }
            }
          }

          const hasConflict = conflicts.size > 0
          return (
            <ConditionalWrapper
              key={sectionCode}
              condition={hasConflict}
              wrapper={(children: any) => (
                <Tooltip
                  label={`This section conflicts with ${Array.from(
                    conflicts.values()
                  )
                    .map((conflict) => {
                      const { department, numeral } = breakdownCourseCode(
                        conflict.title
                      )
                      return `${department}${numeral} ${conflict.category
                        .substring(0, 3)
                        .toUpperCase()}${conflict.section}`
                    })
                    .join(", ")}${concerning ? ", and may be full" : ""}`}
                >
                  {children}
                </Tooltip>
              )}
            >
              <Grid
                tabIndex={0}
                _focus={{
                  background: isSelected ? "" : hoverBackground,
                }}
                outline="none"
                fontSize="sm"
                // alignContent="center"
                alignItems="center"
                gridTemplateColumns="auto auto 1fr auto"
                width="100%"
                boxShadow={`inset 0 2px 3px -3px ${boxShadowColour} ${
                  isSelected ? `, inset 0 0 6px -3px rgba(0,0,0,0.5)` : ""
                }`}
                margin={0}
                p={2.5}
                pl={5}
                fontWeight="600"
                cursor={isSelected ? "default" : "pointer"}
                _hover={{
                  background: isSelected ? "" : hoverBackground,
                }}
                // border={hasConflict ? "1px solid red" : "none"}
                // transition="background 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)"
                role="button"
                onClick={() => {
                  if (!sectionCode) return

                  setSections({
                    courseId: identifier,
                    sections: [sectionCode],
                  })

                  dispatch({
                    type: "SET_HOVER_MEETING",
                    payload: {
                      courseIdentifier: "",
                      meeting: "",
                    },
                  })
                  // dispatch({
                  //   type: "SET_MEETING",
                  //   payload: {
                  //     identifier,
                  //     meeting: sectionCode,
                  //     method: method,
                  //   },
                  // })
                }}
                onMouseEnter={() => {
                  if (isSelected || !sectionCode) return
                  dispatch({
                    type: "SET_HOVER_MEETING",
                    payload: {
                      courseIdentifier: identifier,
                      meeting: sectionCode,
                    },
                  })
                }}
                onMouseLeave={() => {
                  if (isSelected) return
                  dispatch({
                    type: "SET_HOVER_MEETING",
                    payload: {
                      courseIdentifier: "",
                      meeting: "",
                    },
                  })
                }}
                background={isSelected ? activePillColour : pillColour}
                color={
                  isSelected
                    ? activePillTextColour
                    : hasConflict
                    ? conflictPillTextColour
                    : concerning
                    ? concerningPillTextColour
                    : pillTextColour
                }
              >
                <Box mr={3} position="relative" bottom="0.1rem" fontSize="md">
                  {isSelected ? (
                    <CheckIcon />
                  ) : (
                    <AddIcon
                      opacity={0.7}
                      transition="transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
                      _hover={{
                        transform: "rotate(90deg)",
                      }}
                    />
                  )}
                </Box>
                <Text
                  fontFamily="interstate-mono, monospace"
                  key={sectionCode}
                  fontSize="md"
                  colorScheme={isSelected ? "green" : "gray"}
                >
                  {/* TODO: Maybe make this a pref? */}
                  {/* <Text as="span" mr="0.2rem" opacity={0.5}> {sectionCode.split("-")[0]} </Text> */}
                  {sectionCode?.split("-")[1]}
                </Text>

                {/* <Box>{JSON.stringify(meeting.schedule)}</Box> */}
                {/* <Flex
                                    alignItems="center"
                                    flexWrap="wrap"
                                    ml={1.5}
                                >
                                    {Object.values(meeting.schedule).map(
                                        (session) => (
                                            <Text
                                                _before={{
                                                    content: `"${session.meetingDay}"`,
                                                    fontSize: "0.8em",
                                                    opacity: 0.6,
                                                }}
                                                fontFamily="interstate-mono, monospace"
                                                ml={1}
                                            >
                                                {session.meetingStartTime}-
                                                {session.meetingEndTime}
                                            </Text>
                                        )
                                    )}
                                </Flex> */}

                {/* <Skeleton
                                    width="90%"
                                    height="100%"
                                    justifySelf="center"
                                    alignSelf="center"
                                    display="flex"
                                    alignItems="center"
                                    margin="auto"
                                    // textAlign="left"
                                    isLoaded={true}
                                > */}
                <Text opacity={hasConflict ? 1 : 0.7} lineHeight={1} ml={2}>
                  {/* {Object.values(
                                        course.meetings[meeting].schedule
                                    ).reduce((prev, scheduledMeeting) => {
                                        return `${prev ? prev + ", " : ""}${
                                            scheduledMeeting.meetingDay
                                        } ${
                                            scheduledMeeting.meetingStartTime
                                        }-${scheduledMeeting.meetingEndTime}`
                                    }, "")} */}
                  {/* {Object.values(
                                        course.meetings[meeting].instructors
                                    ).reduce(
                                        (prev, instructor) =>
                                            `${prev ? prev + ", " : ""}${
                                                instructor.lastName
                                            }, ${instructor.firstName}.`,
                                        ""
                                    )} */}

                  {section.instructors.join(", ") ||
                  parseInt(section?.actualWaitlist as string)
                    ? `Waitlist ${section?.actualWaitlist} student${
                        parseInt(section?.actualWaitlist as string) === 1
                          ? ""
                          : "s"
                      }`
                    : `Enrol ${section.actualEnrolment} of ${
                        section.enrolmentCapacity
                      }${
                        concerning && !section.hasWaitlist ? "—No waitlist" : ""
                      }`}

                  {/* <Text as="span" ml={2}>
                                        {meeting.enrolmentIndicator}
                                    </Text> */}
                </Text>
                {/* </Skeleton> */}

                <Flex mx={1} alignItems="center" fontSize="lg">
                  {(() => {
                    const deliveryMode = section.deliveryMode
                    if (!deliveryMode) return

                    switch (deliveryMode) {
                      // case "ONLINE_ASYNC":
                      case "ASYNC":
                      case "ASYIF":
                        return (
                          <Tooltip
                            label={`${section.deliveryMode}—no time on timetable.`}
                          >
                            <chakra.span mr={2}>
                              <FaInternetExplorer />
                            </chakra.span>
                          </Tooltip>
                        )
                        break
                        defualt: return
                    }
                  })()}

                  {hasConflict ? (
                    <WarningTwoIcon />
                  ) : concerning ? (
                    <Tooltip label="This section may be full">
                      <WarningIcon opacity="0.6" />
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  <Button
                    variant="link"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation()
                    }}
                  >
                    <QuestionIcon fontSize="lg" />
                  </Button>
                </Flex>
              </Grid>
            </ConditionalWrapper>
          )
        })}
      </VStack>
    </Box>
  )
}

export default MeetingPicker
