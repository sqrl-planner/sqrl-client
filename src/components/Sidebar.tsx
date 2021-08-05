import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react"
import React, { Fragment, useEffect, useRef } from "react"
import reactStringReplace from "react-string-replace"
import { StandardCourse } from "../Course"
import { useAppContext } from "../SqrlContext"
import { MeetingCategoryType } from "./timetable/Meeting"
import { breakdownCourseCode } from "./timetable/MeetingComponent"

const CourseSubheading = ({ children }: { children: React.ReactNode }) => (
    <Text
        textTransform="uppercase"
        fontWeight={700}
        letterSpacing="0.3px"
        mt={5}
        mb={1}
        fontSize="0.8em"
    >
        {children}
    </Text>
)

export const wrapCourseWithElement = (
    courses: string,
    Element: React.FunctionComponent
) => {
    courses =
        "(60% or higher in (CSC148H1/CSC148H5/CSCA48H3), 60% or higher in (CSC165H1/CSC240H1/MAT102H5/MATA67H3/ CSCA67H3)) / 60% or higher in CSC111H1"

    const parsed = courses.replace(/[A-Za-z]{3}\d{3,}[H,Y]\d/g, (value) => {
        console.log(value)
        return value
    })

    return (
        <Fragment>
            <Element>{JSON.stringify(parsed)}</Element>
        </Fragment>
    )
}

const SidebarComponent = ({
    course,
    identifier,
}: {
    course: StandardCourse
    identifier: string
}) => {
    const pillTextColour = useColorModeValue("gray.700", "gray.100")
    const activePillTextColour = useColorModeValue("green.50", "green.800")

    const boxBackground = useColorModeValue("gray.75", "gray.900")

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

    meetingPicker = Object.values(MeetingCategoryType).map((category) => {
        const categories = Object.keys(course.meetings).filter((meeting) =>
            meeting.includes(category.substring(0, 3).toUpperCase())
        )

        if (!categories.length) return <Fragment key={category} />

        return (
            <Box key={category}>
                <CourseSubheading>{category}</CourseSubheading>
                <Flex flexWrap="wrap" mt={1}>
                    {categories.map((meeting) => (
                        <Button
                            fontFamily="interstate-mono, monospace"
                            key={meeting}
                            mr={1}
                            mb={2}
                            fontSize="sm"
                            fontWeight="600"
                            boxShadow="sm"
                            colorScheme={
                                userMeetings[identifier][category] === meeting
                                    ? "green"
                                    : "gray"
                            }
                            color={
                                userMeetings[identifier][category] === meeting
                                    ? activePillTextColour
                                    : pillTextColour
                            }
                            onClick={() => {
                                dispatch({
                                    type: "SET_MEETING",
                                    payload: {
                                        identifier,
                                        meeting,
                                        method: category,
                                    },
                                })
                            }}
                            borderRadius="100rem"
                            _last={{
                                marginBottom: 0,
                            }}
                        >
                            {/* TODO: Do we really need this? */}
                            {/* <Text as="span" mr="0.2rem">
                                {meeting.split("-")[0]}
                            </Text> */}
                            {meeting.split("-")[1]}
                        </Button>
                    ))}
                </Flex>
            </Box>
        )
    })

    return course ? (
        <Box
            width="25rem"
            minHeight="calc(100vh - 4.5rem)"
            p={5}
            background={boxBackground}
            ref={boxRef}
        >
            <Heading
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
            <Heading as="h4" size="md" opacity="0.6" mb={6}>
                {course.courseTitle}
            </Heading>
            {meetingPicker}
            <Box>
                <CourseSubheading>Description</CourseSubheading>
                <Text
                    dangerouslySetInnerHTML={{
                        __html: course.courseDescription,
                    }}
                ></Text>
            </Box>
            {!!course.prerequisite.length && (
                <Box>
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
                                >
                                    {match}
                                </Button>
                            )
                        )}
                    </Text>
                </Box>
            )}
            {!!course.exclusion.length && (
                <Fragment>
                    <Box>
                        <CourseSubheading>Exclusions</CourseSubheading>
                        <Text>
                            {reactStringReplace(
                                course.exclusion,
                                /([A-Za-z]{3,4}\d{2,4}[H,Y]\d)/g,
                                (match, i) => (
                                    <Button variant="link" key={i} p={1}>
                                        {match}
                                    </Button>
                                )
                            )}
                        </Text>
                    </Box>
                </Fragment>
            )}
            {!!course.webTimetableInstructions.length && (
                <Box>
                    <CourseSubheading>Distribution</CourseSubheading>
                    <Text
                        dangerouslySetInnerHTML={{
                            __html: course.webTimetableInstructions,
                        }}
                    />
                </Box>
            )}
            {!!course.distributionCategories.length && (
                <Box>
                    <CourseSubheading>Distribution</CourseSubheading>
                    <Text>{course.distributionCategories}</Text>
                </Box>
            )}
        </Box>
    ) : (
        <Box
            p={5}
            width="25rem"
            boxShadow="0px 0px 6px rgba(0, 0, 0, 0.2)"
            // background={boxBackground}
        ></Box>
    )
}

export default SidebarComponent
