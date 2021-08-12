import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { useAppContext, UserMeeting } from "../../SqrlContext"
import { breakdownCourseCode } from "../../utils/course"

export const CourseSubheading = ({
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

const OverviewView = () => {
    const {
        state: { courses, userMeetings },
        dispatch,
    } = useAppContext()

    return (
        <Box width="100%" height="100%">
            <Heading
                p={5}
                pb={0}
                as="h3"
                size="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                My courses
            </Heading>
            <VStack mt={5} spacing={0}>
                {Object.keys(userMeetings).map((identifier) => {
                    // If no meeting selected
                    if (!Object.keys(userMeetings[identifier]).length) return ""

                    const course = courses[identifier]
                    const { department, numeral, suffix } = breakdownCourseCode(
                        course.code
                    )

                    return (
                        <Flex
                            key={identifier}
                            width="100%"
                            m={0}
                            px={5}
                            py={3}
                            boxShadow={`inset 0 2px 3px -3px rgba(0,0,0,0.5)`}
                            fontWeight={500}
                            alignItems="baseline"
                        >
                            <Box>
                                <Text
                                    fontSize="1.25em"
                                    as="span"
                                    fontWeight={600}
                                >
                                    {department + numeral}
                                </Text>
                                <Text as="span">{suffix}</Text>
                                <Text as="span" ml={1}>
                                    {(() => {
                                        if (course.term === "FIRST_SEMESTER")
                                            return "F"
                                        if (course.term === "SECOND_SEMESTER")
                                            return "S"
                                        return "Y"
                                    })()}
                                </Text>
                            </Box>
                            <Flex>
                                {Object.keys(userMeetings[identifier]).map(
                                    (method: any) => (
                                        <Text _before={{ content: `""` }}>
                                            {/* {userMeetings[identifier][method]} */}
                                        </Text>
                                    )
                                )}
                            </Flex>
                        </Flex>
                    )
                })}
            </VStack>
        </Box>
    )
}

export default OverviewView
