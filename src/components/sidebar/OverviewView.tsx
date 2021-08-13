import { WarningTwoIcon } from "@chakra-ui/icons"
import {
    Box,
    Flex,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tag,
    Text,
    Tooltip,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import React, { Fragment, useEffect, useState } from "react"
import { useAppContext } from "../../SqrlContext"
import {
    breakdownCourseCode,
    breakdownCourseIdentifier,
    getMeetingTypes,
} from "../../utils/course"
import { ConditionalWrapper } from "./MeetingPicker"

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

    const [coursesToShow, setCoursesToShow] = useState<{
        first: Array<string>
        second: Array<string>
        year: Array<string>
    }>({ first: [], second: [], year: [] })

    const hoverBackground = useColorModeValue("gray.100", "gray.600")

    useEffect(() => {
        const activeCourseIdentifiers = Object.keys(userMeetings).filter(
            (identifier) => !!Object.keys(userMeetings[identifier]).length
        )

        setCoursesToShow({
            first: activeCourseIdentifiers.filter(
                (identifier) =>
                    breakdownCourseIdentifier(identifier).term === "F"
            ),
            second: activeCourseIdentifiers.filter(
                (identifier) =>
                    breakdownCourseIdentifier(identifier).term === "S"
            ),
            year: activeCourseIdentifiers.filter(
                (identifier) =>
                    breakdownCourseIdentifier(identifier).term === "Y"
            ),
        })
    }, [setCoursesToShow, userMeetings])

    const missingColour = useColorModeValue("yellow.600", "yellow.100")

    const [credits, setCredits] = useState<{
        first: number
        second: number
        year: number
    }>({ first: 0, second: 0, year: 0 })

    useEffect(() => {
        if (!Object.keys(coursesToShow).length) return

        for (const [term, courses] of Object.entries(coursesToShow)) {
            const termCredits = courses.reduce((prev, identifier) => {
                const { suffix } = breakdownCourseIdentifier(identifier)
                const credit = suffix.substring(0, 1) === "H" ? 0.5 : 1

                return prev + credit
            }, 0)
            setCredits((prev) => ({ ...prev, [term]: termCredits }))
        }
    }, [coursesToShow])

    return (
        <Box width="100%" height="100%">
            {/* <Heading
                p={5}
                pb={0}
                as="h3"
                size="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                My courses
            </Heading> */}
            <VStack spacing={0}>
                <StatGroup width="100%" px={5} mt={5}>
                    <Stat>
                        {(() => {
                            const total = Object.values(credits).reduce(
                                (prev, curr) => prev + curr,
                                0
                            )
                            return (
                                <Fragment>
                                    <StatLabel>Credits</StatLabel>
                                    <StatNumber
                                        color="green.600"
                                        fontSize="3xl"
                                    >
                                        {total.toFixed(1)}
                                    </StatNumber>
                                    <StatHelpText>
                                        {Math.round((total / 5) * 100)}% of
                                        standard load.
                                    </StatHelpText>
                                </Fragment>
                            )
                        })()}
                    </Stat>

                    <Stat>
                        <StatLabel>Courses</StatLabel>
                        <StatNumber fontSize="3xl">
                            {Object.values(coursesToShow).reduce(
                                (prev, courses) =>
                                    Object.keys(courses).length + prev,
                                0
                            )}
                        </StatNumber>
                        <StatHelpText>in this year.</StatHelpText>
                        {/* <StatHelpText>
                            {Object.keys(coursesToShow).map((term) => {
                                return `${
                                    Object.keys(coursesToShow[term]).length
                                } in ${term}${term === "year" ? "." : ", "}`
                            })}
                        </StatHelpText> */}
                    </Stat>
                </StatGroup>
                {(
                    Object.keys(coursesToShow) as Array<
                        "first" | "second" | "year"
                    >
                ).map((term) => {
                    // term = term as "first" | "second" | "year"
                    if (!Object.keys(coursesToShow).length)
                        return <Fragment key={term} />

                    if (!credits[term]) return <Fragment key={term} />

                    return (
                        <Box width="100%" key={term} pb={2}>
                            <CourseSubheading px={5}>
                                {term}:{" "}
                                <Text as="span" fontWeight={500}>
                                    {credits[term]} credit
                                    {credits[term] !== 1 && "s"}
                                    {/* {coursesToShow[term].length} course
                                    {coursesToShow[term].length !== 1 && "s"} */}
                                    {term !== "year" &&
                                        `; ${(credits[term] / 2.5) * 100}%`}
                                </Text>
                            </CourseSubheading>
                            {coursesToShow[term].map((identifier: string) => {
                                const course = courses[identifier]
                                const { department, numeral, suffix } =
                                    breakdownCourseCode(course.code)
                                const courseMeetingTypes =
                                    getMeetingTypes(course)

                                let missing: Array<
                                    "lecture" | "tutorial" | "practical"
                                > = []

                                for (const [
                                    meetingType,
                                    meetingTypeExists,
                                ] of Object.entries(courseMeetingTypes)) {
                                    if (!meetingTypeExists) continue

                                    if (
                                        !userMeetings[identifier][
                                            meetingType as
                                                | "lecture"
                                                | "tutorial"
                                                | "practical"
                                        ]
                                    ) {
                                        missing.push(
                                            meetingType as
                                                | "lecture"
                                                | "tutorial"
                                                | "practical"
                                        )
                                    }
                                }

                                // return <Text>{course.code}</Text>
                                return (
                                    <ConditionalWrapper
                                        key={identifier}
                                        condition={missing.length}
                                        wrapper={(children: any) => (
                                            <Tooltip
                                                label={`Missing a ${missing.join(
                                                    ", "
                                                )} section`}
                                            >
                                                {children}
                                            </Tooltip>
                                        )}
                                    >
                                        <Flex
                                            _hover={{
                                                background: hoverBackground,
                                            }}
                                            cursor="pointer"
                                            width="100%"
                                            m={0}
                                            px={5}
                                            py={3}
                                            boxShadow={`inset 0 2px 3px -3px rgba(0,0,0,0.5)`}
                                            color={
                                                missing.length
                                                    ? missingColour
                                                    : ""
                                            }
                                            fontWeight={500}
                                            alignItems="baseline"
                                            justifyContent="space-between"
                                            onClick={() => {
                                                dispatch({
                                                    type: "SET_SIDEBAR",
                                                    payload: 1,
                                                })
                                                dispatch({
                                                    type: "SET_SIDEBAR_COURSE",
                                                    payload: identifier,
                                                })
                                            }}
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
                                                        if (
                                                            course.term ===
                                                            "FIRST_SEMESTER"
                                                        )
                                                            return "F"
                                                        if (
                                                            course.term ===
                                                            "SECOND_SEMESTER"
                                                        )
                                                            return "S"
                                                        return "Y"
                                                    })()}
                                                </Text>
                                            </Box>
                                            <Flex
                                                alignItems="center"
                                                fontFamily="interstate-mono, monospace"
                                            >
                                                {Object.keys(
                                                    userMeetings[identifier]
                                                ).map((method: any) => (
                                                    <Tag key={method} ml={2}>
                                                        {userMeetings[
                                                            identifier
                                                        ][method].replace(
                                                            "-",
                                                            " "
                                                        )}
                                                        {/* {userMeetings[identifier][method]} */}
                                                    </Tag>
                                                ))}
                                                {!!missing.length && (
                                                    <WarningTwoIcon ml={2} />
                                                )}
                                            </Flex>
                                        </Flex>
                                    </ConditionalWrapper>
                                )
                            })}
                        </Box>
                    )
                })}
            </VStack>
        </Box>
    )
}

export default OverviewView
