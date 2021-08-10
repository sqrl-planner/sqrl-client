import { AddIcon, CheckIcon, QuestionIcon, WarningIcon } from "@chakra-ui/icons"
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Icon,
    Skeleton,
    Text,
    Tooltip,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import reactStringReplace from "react-string-replace"
import { Course } from "../../Course"
import { useAppContext } from "../../SqrlContext"
import { MeetingCategoryType } from "../timetable/Meeting"
import { breakdownCourseCode } from "../timetable/MeetingComponent"

const CourseSubheading = ({
    children,
    ...rest
}: {
    children: React.ReactNode
}) => (
    <Text
        textTransform="uppercase"
        fontWeight={700}
        letterSpacing="0.3px"
        mt={5}
        mb={1}
        fontSize="0.8em"
        {...rest}
    >
        {children}
    </Text>
)

const SidebarComponent = () => {
    const pillTextColour = useColorModeValue("gray.800", "gray.100")
    const pillColour = useColorModeValue("gray.75", "gray.800")
    const activePillTextColour = useColorModeValue("green.700", "green.100")
    const activePillColour = useColorModeValue("green.100", "green.700")

    const concerningPillTextColour = useColorModeValue(
        "yellow.700",
        "yellow.100"
    )
    // const waitlistPillColour = useColorModeValue("yellow.100", "yellow.900")

    const boxShadowColour = useColorModeValue(
        "rgba(0,0,0,0.5)",
        "rgba(255, 255, 255, 0.5)"
    )

    const hoverBackground = useColorModeValue("gray.100", "gray.600")

    const {
        state: { userMeetings, courses, sidebarCourse: identifier },
        dispatch,
    } = useAppContext()

    const course = courses[identifier]

    // TODO: meetings out of the timetable's display bounds are hidden without warning. Warn them.

    const boxRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        if (!boxRef.current) return
        boxRef.current?.scrollIntoView({ behavior: "smooth" })
        // const headerOffset = 500
        // const elementPosition = boxRef.current.getBoundingClientRect().top
        // console.log(boxRef.current.offsetTop)
        // const offsetPosition = elementPosition - headerOffset
        // window.scrollTo({
        //     top: offsetPosition,
        //     behavior: "smooth",
        // })
    }, [boxRef, course])

    let meetingPicker: Array<React.ReactNode> = []

    const scrollingTimeoutRef = useRef<any>(null)

    const [scrolling, setScrolling] = useState<boolean>(false)

    if (!course) {
        return (
            <Box p={5}>
                <Heading
                    pb={2}
                    as="h3"
                    size="lg"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    No course
                </Heading>
                <Text>Pick a course to see information regarding it.</Text>
            </Box>
        )
    }

    meetingPicker = Object.values(MeetingCategoryType).map((method) => {
        const matchingMethod = course.sections.filter(
            (meeting) =>
                meeting.teachingMethod.toUpperCase() === method.toUpperCase()
        )

        if (!matchingMethod.length) return <Fragment key={method} />

        return (
            <Box
                key={method}
                // px={5}
                pointerEvents={scrolling ? "none" : "auto"}
            >
                <Flex
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <CourseSubheading px={5}>{method}</CourseSubheading>
                    <Icon
                        cursor="pointer"
                        as={FaTrashAlt}
                        position="relative"
                        top={1.5}
                        fontSize="sm"
                        pl={0.5}
                        mr={6}
                        opacity={
                            userMeetings[identifier] &&
                            userMeetings[identifier][method]
                                ? ""
                                : "0.5"
                        }
                        onClick={() => {
                            dispatch({
                                type: "REMOVE_MEETING",
                                payload: {
                                    identifier,
                                    method,
                                },
                            })
                        }}
                    />
                </Flex>
                <VStack spacing={0}>
                    {matchingMethod.map((section) => {
                        const sectionCode = section.code
                        const isSelected =
                            userMeetings[identifier] &&
                            userMeetings[identifier][method] === sectionCode

                        const meeting = section

                        // const meeting = course.sections.filter(
                        //     (courseSection) =>
                        //         courseSection.teachingMethod === section
                        // )[0]
                        // A meeting is concerning if it is waitlisting or it has no waitlist and is fully enrolled
                        let concerning = !!parseInt(meeting.actualWaitlist)

                        if (
                            // meeting.waitlist === "N" &&
                            meeting.enrolmentCapacity ===
                            meeting.actualEnrolment
                        )
                            concerning = true

                        return (
                            <Grid
                                fontSize="sm"
                                key={sectionCode}
                                alignContent="center"
                                alignItems="center"
                                gridTemplateColumns="auto auto 1fr auto"
                                width="100%"
                                boxShadow={`inset 0 2px 3px -3px ${boxShadowColour} ${
                                    isSelected
                                        ? `, inset 0 0 6px -3px rgba(0,0,0,0.5)`
                                        : ""
                                }`}
                                margin={0}
                                p={2.5}
                                pl={5}
                                fontWeight="600"
                                cursor={isSelected ? "default" : "pointer"}
                                _hover={{
                                    background: isSelected
                                        ? ""
                                        : hoverBackground,
                                }}
                                transition="background 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                onClick={() => {
                                    dispatch({
                                        type: "SET_MEETING",
                                        payload: {
                                            identifier,
                                            meeting: sectionCode,
                                            method: method,
                                        },
                                    })
                                    dispatch({
                                        type: "SET_HOVER_MEETING",
                                        payload: {
                                            courseIdentifier: "",
                                            meeting: "",
                                        },
                                    })
                                }}
                                onMouseEnter={() => {
                                    if (isSelected) return
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
                                background={
                                    isSelected ? activePillColour : pillColour
                                }
                                color={
                                    isSelected
                                        ? activePillTextColour
                                        : concerning
                                        ? concerningPillTextColour
                                        : pillTextColour
                                }
                            >
                                <Box
                                    mr={4}
                                    position="relative"
                                    bottom="0.1rem"
                                    fontSize="md"
                                >
                                    {isSelected ? (
                                        <CheckIcon />
                                    ) : (
                                        <AddIcon
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
                                    {/* TODO: Do we really need this? */}
                                    {/* <Text as="span" mr="0.2rem">
                                {meeting.split("-")[0]}
                            </Text> */}
                                    {sectionCode.split("-")[1]}
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

                                <Skeleton
                                    width="90%"
                                    justifySelf="center"
                                    display="flex"
                                    alignItems="center"
                                    // textAlign="left"
                                    isLoaded={true}
                                >
                                    <Text opacity={0.7}>
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

                                        {parseInt(meeting.actualWaitlist)
                                            ? // ? "yue"
                                              `Waitlist ${
                                                  meeting.actualWaitlist
                                              } student${
                                                  parseInt(
                                                      meeting.actualWaitlist
                                                  ) === 1
                                                      ? ""
                                                      : "s"
                                              }`
                                            : `Enrol ${
                                                  meeting.actualEnrolment
                                              } of ${
                                                  meeting.enrolmentCapacity
                                              }${
                                                  concerning &&
                                                  !meeting.hasWaitlist
                                                      ? "—No waitlist"
                                                      : ""
                                              }`}
                                        {/* <Text as="span" ml={2}>
                                        {meeting.enrollmentIndicator}
                                    </Text> */}
                                    </Text>
                                </Skeleton>
                                {/* <Text>{course.meetings[section].online}</Text> */}

                                <Flex
                                    mx={1}
                                    alignItems="center"
                                    // position="relative"
                                    // bottom="0.1rem"
                                    fontSize="lg"
                                >
                                    {concerning && (
                                        <Tooltip label="This section may be full">
                                            <WarningIcon opacity="0.6" />
                                        </Tooltip>
                                    )}
                                    <Button
                                        variant="link"
                                        // color="blue.500"
                                        // m={0}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        <QuestionIcon fontSize="lg" />
                                    </Button>
                                </Flex>
                            </Grid>
                        )
                    })}
                </VStack>
            </Box>
        )
    })

    const { department, numeral, suffix } = breakdownCourseCode(course.code)

    return (
        <Box
            width="100%"
            height="100%"
            onScroll={() => {
                if (scrollingTimeoutRef.current) {
                    clearTimeout(scrollingTimeoutRef.current)
                }

                setScrolling(true)

                scrollingTimeoutRef.current = setTimeout(() => {
                    setScrolling(false)
                }, 200)
            }}
        >
            <Box
                ref={boxRef}
                position="relative"
                bottom="100rem"
                visibility="hidden"
                role="none"
            ></Box>

            <Heading
                p={5}
                pb={0}
                as="h3"
                size="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    {department + numeral}
                    <Text as="span" fontSize="0.8em">
                        {suffix}
                    </Text>
                    <Text as="span" fontSize="0.8em" ml={2}>
                        {(() => {
                            if (course.term === "FIRST_SEMESTER") return "F"
                            if (course.term === "SECOND_SEMESTER") return "S"
                            return "Y"
                        })()}
                    </Text>
                </Box>
                <Box>
                    <Tooltip label={course.breadthCategories}>
                        <Text
                            fontSize="0.7em"
                            width="1.5em"
                            height="1.5em"
                            backgroundColor="rgba(221, 221, 221, 0.2)"
                            padding={2}
                            borderRadius="100rem"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {course.breadthCategories
                                .match(/\d/g)
                                ?.sort()
                                .join(", ")}
                        </Text>
                    </Tooltip>
                </Box>
            </Heading>
            <Heading as="h4" size="md" opacity="0.6" mb={2} px={5}>
                {course.title}
            </Heading>
            {meetingPicker}
            <Box>
                <Accordion allowToggle mt={4} borderColor="rgba(0,0,0,0)">
                    <AccordionItem>
                        <AccordionButton
                            p={0}
                            px={5}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <CourseSubheading my={2} px={5}>
                                Description
                            </CourseSubheading>
                            <AccordionIcon mr={5} />
                        </AccordionButton>
                        <AccordionPanel px={5} pb={4}>
                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: course.description,
                                }}
                            ></Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            {!!course.prerequisites.length && (
                <Box mx={5}>
                    <CourseSubheading>Prerequisites</CourseSubheading>
                    <Text>
                        {reactStringReplace(
                            course.prerequisites,
                            // three to four alpha characters, two to four digits, H or Y, and a digit
                            /([A-Za-z]{3,4}\d{2,4}[H,Y]\d?)/g,
                            (match, i) => (
                                <Button
                                    variant="link"
                                    colorScheme="gray"
                                    key={i}
                                    p={1}
                                    fontFamily="interstate-mono, monospace"
                                >
                                    {match}
                                </Button>
                            )
                        )}
                    </Text>
                </Box>
            )}
            {!!course.exclusions.length && (
                <Box px={5}>
                    <CourseSubheading>Exclusions</CourseSubheading>
                    <Text>
                        {reactStringReplace(
                            course.exclusions,
                            /([A-Za-z]{3,4}\d{2,4}[H,Y]\d?)/g,
                            (match, i) => (
                                <Button
                                    variant="link"
                                    key={i}
                                    p={1}
                                    fontFamily="interstate-mono, monospace"
                                >
                                    {match}
                                </Button>
                            )
                        )}
                    </Text>
                </Box>
            )}
            {!!course.webTimetableInstructions?.length && (
                <Box px={5}>
                    <CourseSubheading>Instructions</CourseSubheading>
                    <Text
                        dangerouslySetInnerHTML={{
                            __html: course.webTimetableInstructions,
                        }}
                    />
                </Box>
            )}
            {!!course.distributionCategories.length && (
                <Box px={5}>
                    <CourseSubheading>Distribution</CourseSubheading>
                    <Text>{course.distributionCategories}</Text>
                </Box>
            )}
        </Box>
    )
}

export default SidebarComponent
