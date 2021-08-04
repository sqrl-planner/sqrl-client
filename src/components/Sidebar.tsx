import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { Fragment, useState } from "react"
import { StandardCourse } from "../Course"
import { MeetingCategoryType } from "./timetable/Meeting"
import { breakdownCourseCode } from "./timetable/MeetingComponent"

const CourseSubheading = ({ children }: { children: React.ReactNode }) => (
    <Text
        textTransform="uppercase"
        fontWeight={600}
        mt={4}
        mb={2}
        fontSize="0.8em"
    >
        {children}
    </Text>
)

const SidebarComponent = ({ course }: { course: StandardCourse }) => {
    const pillColour = useColorModeValue("gray.100", "gray.700")
    const pillTextColour = useColorModeValue("gray.700", "gray.100")
    const activePillColour = useColorModeValue("green.100", "green.800")
    const activePillTextColour = useColorModeValue("green.800", "green.100")

    const boxBackground = useColorModeValue("gray.75", "gray.900")

    const [activePills, setActivePills] = useState<{
        lecture?: string
        tutorial?: string
        practical?: string
    }>({ lecture: "LEC-0101" })

    const { department, numeral, suffix } = breakdownCourseCode(course.code)

    let meetingPicker: Array<React.ReactNode> = []

    meetingPicker = Object.values(MeetingCategoryType).map((category) => {
        const categories = Object.keys(course.meetings).filter((meeting) =>
            meeting.includes(category.substring(0, 3).toUpperCase())
        )

        if (!categories.length) return <Fragment />

        return (
            <Box>
                <CourseSubheading>{category}</CourseSubheading>

                <Flex flexWrap="wrap">
                    {categories.map((meeting) => (
                        <Button
                            mr={2}
                            mb={2}
                            fontSize="sm"
                            fontWeight="600"
                            bgColor={
                                activePills[category] === meeting
                                    ? activePillColour
                                    : pillColour
                            }
                            color={
                                activePills[category] === meeting
                                    ? activePillTextColour
                                    : pillTextColour
                            }
                            onClick={() => {
                                setActivePills((prev) => ({
                                    ...prev,
                                    [category]: meeting,
                                }))
                            }}
                            borderRadius="100rem"
                        >
                            {meeting.replace(/-/g, " ")}
                        </Button>
                    ))}
                </Flex>
            </Box>
        )
    })

    return course ? (
        <Box width="24rem" p={5} background={boxBackground}>
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
                            backgroundColor="rgba(0,0,0,0.1)"
                            padding={2}
                            borderRadius="100rem"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {course.breadthCategories.match(/\d/g)?.join(", ")}
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
            <Box>
                <CourseSubheading>Prerequisites</CourseSubheading>
                <Text>{course.prerequisite}</Text>
            </Box>
        </Box>
    ) : (
        <Box
            p={5}
            width="24rem"
            boxShadow="0px 0px 6px rgba(0, 0, 0, 0.2)"
            // background={boxBackground}
        ></Box>
    )
}

export default SidebarComponent
