import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react"
import React, { Fragment } from "react"
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

const SidebarComponent = ({
    course,
    identifier,
}: {
    course: StandardCourse
    identifier: string
}) => {
    const pillColour = useColorModeValue("gray.100", "gray.700")
    const pillTextColour = useColorModeValue("gray.700", "gray.100")
    const activePillColour = useColorModeValue("green.100", "green.800")
    const activePillTextColour = useColorModeValue("green.800", "green.100")

    const boxBackground = useColorModeValue("gray.75", "gray.900")

    const {
        state: { userMeetings },
        dispatch,
    } = useAppContext()

    // TODO: meetings out of the timetable's display bounds are hidden without warning. Warn them.

    const { department, numeral, suffix } = breakdownCourseCode(course.code)

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
                            bgColor={
                                userMeetings[identifier][category] === meeting
                                    ? activePillColour
                                    : pillColour
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
                                // setActivePills((prev) => ({
                                //     ...prev,
                                //     [category]: meeting,
                                // }))
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
                    <Text>{course.prerequisite}</Text>
                </Box>
            )}
            {!!course.exclusion.length && (
                <Fragment>
                    <Box>
                        <CourseSubheading>Exclusions</CourseSubheading>
                        <Text>{course.exclusion}</Text>
                    </Box>
                </Fragment>
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
