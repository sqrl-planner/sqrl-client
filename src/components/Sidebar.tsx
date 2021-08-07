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
import { StandardCourse } from "../Course"
import { useAppContext } from "../SqrlContext"
import { MeetingCategoryType } from "./timetable/Meeting"
import { breakdownCourseCode } from "./timetable/MeetingComponent"

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

const SidebarComponent = ({
    course,
    identifier,
}: {
    course: StandardCourse
    identifier: string
}) => {
    const pillTextColour = useColorModeValue("gray.800", "gray.100")
    const pillColour = useColorModeValue("gray.100", "gray.800")
    const activePillTextColour = useColorModeValue("green.700", "green.100")
    const activePillColour = useColorModeValue("green.100", "green.700")

    const concerningPillTextColour = useColorModeValue(
        "yellow.600",
        "yellow.100"
    )
    // const waitlistPillColour = useColorModeValue("yellow.100", "yellow.900")

    const boxShadowColour = useColorModeValue(
        "rgba(0,0,0,0.5)",
        "rgba(255, 255, 255, 0.5)"
    )

    const hoverBackground = useColorModeValue("gray.200", "gray.600")

    const boxBackground = useColorModeValue("gray.75", "gray.700")

    const {
        state: { userMeetings },
        dispatch,
    } = useAppContext()

    const boxRef = useRef<HTMLHeadingElement | null>(null)

    // TODO: meetings out of the timetable's display bounds are hidden without warning. Warn them.

    const { department, numeral, suffix } = breakdownCourseCode(course.code)

    useEffect(() => {
        if (!boxRef.current) return

        boxRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [boxRef, department, numeral, suffix])

    let meetingPicker: Array<React.ReactNode> = []

    const scrollingTimeoutRef = useRef<any>(null)

    const [scrolling, setScrolling] = useState<boolean>(false)

    meetingPicker = Object.values(MeetingCategoryType).map((category) => {
        const categories = Object.keys(course.meetings).filter((meeting) =>
            meeting.includes(category.substring(0, 3).toUpperCase())
        )

        if (!categories.length) return <Fragment key={category} />

        return (
            <Box
                key={category}
                // px={5}
                pointerEvents={scrolling ? "none" : "auto"}
            >
                <Flex
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <CourseSubheading px={5}>{category}</CourseSubheading>
                    <Icon
                        cursor="pointer"
                        as={FaTrashAlt}
                        position="relative"
                        top={1.5}
                        fontSize="sm"
                        pl={0.5}
                        mr={6}
                        opacity={
                            userMeetings[identifier][category] ? "" : "0.5"
                        }
                        onClick={() => {
                            dispatch({
                                type: "REMOVE_MEETING",
                                payload: {
                                    identifier,
                                    method: category,
                                },
                            })
                        }}
                    />
                </Flex>
                <VStack spacing={0}>
                    {categories.map((section) => {
                        const isSelected =
                            userMeetings[identifier][category] === section

                        const meeting = course.meetings[section]

                        // A meeting is concerning if it is waitlisting or it has no waitlist and is fully enrolled
                        let concerning = !!parseInt(meeting.actualWaitlist)

                        if (
                            meeting.waitlist === "N" &&
                            meeting.enrollmentCapacity ===
                                meeting.actualEnrolment
                        )
                            concerning = true

                        return (
                            <Grid
                                fontSize="sm"
                                key={section}
                                alignContent="center"
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
                                            meeting: section,
                                            method: category,
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
                                            meeting: section,
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
                                    key={section}
                                    fontSize="md"
                                    colorScheme={isSelected ? "green" : "gray"}
                                >
                                    {/* TODO: Do we really need this? */}
                                    {/* <Text as="span" mr="0.2rem">
                                {meeting.split("-")[0]}
                            </Text> */}
                                    {section.split("-")[1]}
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
                                                  meeting.enrollmentCapacity
                                              }${
                                                  meeting.waitlist === "N"
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

    return (
        <Box
            width="25rem"
            minHeight="calc(100vh - 4.5rem)"
            pb={5}
            background={boxBackground}
            ref={boxRef}
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
                        {course.section}
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
            <Heading as="h4" size="md" opacity="0.6" mb={6} px={5}>
                {course.courseTitle}
            </Heading>
            {meetingPicker}
            <Box>
                <Accordion allowToggle mt={4}>
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
                                    __html: course.courseDescription,
                                }}
                            ></Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            {!!course.prerequisite.length && (
                <Box mx={5}>
                    <CourseSubheading>Prerequisites</CourseSubheading>
                    <Text>
                        {reactStringReplace(
                            course.prerequisite,
                            // three to four alpha characters, two to four digits, H or Y, and a digit
                            /([A-Za-z]{3,4}\d{2,4}[H,Y]\d)/g,
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
            {!!course.exclusion.length && (
                <Box px={5}>
                    <CourseSubheading>Exclusions</CourseSubheading>
                    <Text>
                        {reactStringReplace(
                            course.exclusion,
                            /([A-Za-z]{3,4}\d{2,4}[H,Y]\d)/g,
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
            {!!course.webTimetableInstructions.length && (
                <Box px={5}>
                    <CourseSubheading>Distribution</CourseSubheading>
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
