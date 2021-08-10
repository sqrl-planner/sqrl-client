import { gql, useLazyQuery } from "@apollo/client"
import {
    Box,
    FormControl,
    Button,
    Input,
    Text,
    Spinner,
    Skeleton,
    FormHelperText,
    VStack,
    Flex,
    Divider,
    useColorModeValue,
    FlexProps,
    ButtonProps,
} from "@chakra-ui/react"
import React, {
    Fragment,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { useDebouncedCallback } from "use-debounce/lib"
import { usePreferences } from "../../PreferencesContext"
import { breakdownCourseCode } from "../timetable/MeetingComponent"
import { AddIcon } from "@chakra-ui/icons"
import { useAppContext } from "../../SqrlContext"
import { GET_COURSE_BY_ID } from "../../operations/queries/getCourseById"
import { SEARCH_COURSES } from "../../operations/queries/searchCourses"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const MotionFlex = motion<FlexProps>(Flex)
const MotionButton = motion<ButtonProps>(Button)

const SearchView = () => {
    const searchRef = useRef() as MutableRefObject<HTMLInputElement>
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [searchOffset, setSearchOffset] = useState<number>(0)
    const [chosenCourse, setChosenCourse] = useState("")

    const hoverBackground = useColorModeValue("gray.100", "gray.600")

    const {
        state: { palette },
    } = usePreferences()

    const {
        state: { userMeetings },
        dispatch,
    } = useAppContext()

    useEffect(() => {
        searchRef.current.focus()
    })

    if (searchRef.current) {
        searchRef.current.focus()
    }

    const [search, { called, loading, data, error, fetchMore }] =
        useLazyQuery(SEARCH_COURSES)

    const debounced = useDebouncedCallback((query) => {
        if (!query) return
        search({ variables: { query, offset: searchOffset } })
    }, 300)

    const [
        getFullCourse,
        {
            loading: fullCourseLoading,
            data: fullCourseData,
            error: fullCourseError,
        },
    ] = useLazyQuery(GET_COURSE_BY_ID, {
        onCompleted: (data) => {
            console.log(data)

            const { courseById: course } = data
            dispatch({
                type: "ADD_COURSE",
                payload: {
                    identifier: course.id,
                    course: course,
                },
            })
            dispatch({
                type: "SET_SIDEBAR",
                payload: 1,
            })
            dispatch({
                type: "SET_SIDEBAR_COURSE",
                payload: course.id,
            })
        },
    })

    let osModifier: string = ""

    if (navigator.userAgent.indexOf("Mac OS X") !== -1) osModifier = "⌘"
    if (navigator.userAgent.indexOf("Windows") !== -1) osModifier = "Ctrl + "

    if (data) console.log(data)

    return (
        <Box width="100%" height="100%">
            <FormControl p={5} py={7}>
                <Input
                    boxShadow="1px 1px 8px -4px rgba(0, 0, 0, 0.4)"
                    placeholder={`Search for a course (${osModifier}K)`}
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        debounced(e.target.value)
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onFocus={(e) => {
                        e.target.select()
                    }}
                />
                <FormHelperText>
                    Try searching for "breadth 5" or "PSY100"
                </FormHelperText>
            </FormControl>
            {loading && (
                <AnimatePresence>
                    {[...new Array(5)].map((_, i) => (
                        <MotionFlex
                            flexDirection="column"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -10,
                                    transition: {
                                        delay: i * 1.15,
                                    },
                                },
                                // hidden: i => ( {
                                //     opacity: 1,
                                // 		transition: {
                                // 			delay: i * 0.05
                                // 		}
                                // } ),
                                visible: (i) => ({
                                    opacity: 1,
                                    y: 0,
                                }),
                            }}
                            custom={i}
                            key={i}
                            initial="hidden"
                            animate="visible"
                            // exit="hidden"
                        >
                            <Skeleton width="30%" height={6} my={1} mt={2} />
                            <Skeleton width="100%" height={12} my={1} mb={2} />
                        </MotionFlex>
                    ))}
                </AnimatePresence>
            )}
            {!loading && !error && !!data && (
                <AnimatePresence>
                    <VStack
                        alignItems="flex-start"
                        spacing={0}
                        opacity={fullCourseLoading ? 0.6 : 1}
                    >
                        {data.searchCourses.map((course: any, i: number) => {
                            console.log(data.searchCourses)

                            const { department, numeral, suffix } =
                                breakdownCourseCode(course.code)
                            return (
                                <MotionFlex
                                    key={course.id}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: -10,
                                        },
                                        // hidden: i => ( {
                                        //     opacity: 1,
                                        // 		transition: {
                                        // 			delay: i * 0.05
                                        // 		}
                                        // } ),
                                        visible: (i) => ({
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: i * 0.02,
                                            },
                                        }),
                                    }}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    alignItems="center"
                                    width="100%"
                                    pr={5}
                                    py={2}
                                    boxShadow={`inset 0 2px 3px -3px rgba(0,0,0,0.5)`}
                                    _hover={{
                                        background: hoverBackground,
                                    }}
                                    tabIndex={0}
                                    onClick={() => {
                                        if (fullCourseLoading) return

                                        setChosenCourse(course.id)

                                        getFullCourse({
                                            variables: { id: course.id },
                                        })
                                    }}
                                    cursor={
                                        fullCourseLoading
                                            ? "not-allowed"
                                            : "pointer"
                                    }
                                >
                                    <Flex
                                        ml={5}
                                        mr={4}
                                        w={4}
                                        h={4}
                                        alignItems="center"
                                    >
                                        {(fullCourseLoading ||
                                            !fullCourseData) &&
                                        chosenCourse === course.id ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            <AddIcon size="md" h={4} w={4} />
                                        )}
                                    </Flex>
                                    <Flex
                                        key={course.code}
                                        fontSize="xl"
                                        width="100%"
                                        fontWeight={500}
                                        alignItems="baseline"
                                        // flexWrap="wrap"
                                        flexDirection="column"
                                    >
                                        <Flex
                                            fontSize="0.8em"
                                            width="100%"
                                            alignItems="center"
                                            justifyContent="space-between"
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
                                            <Box>
                                                <Text
                                                    fontSize="0.7em"
                                                    fontWeight={700}
                                                    opacity={0.7}
                                                >
                                                    {course.campus
                                                        .toUpperCase()
                                                        .replace(/_/g, " ")}
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Text
                                            as="span"
                                            opacity="0.7"
                                            fontSize="0.8em"
                                        >
                                            {course.title}
                                        </Text>
                                        {/* {course.code}: {course.title} */}
                                    </Flex>
                                </MotionFlex>
                            )
                        })}
                        {data.searchCourses.length > 6 ? (
                            <MotionButton
                                alignSelf="center"
                                p={2}
                                mt={4}
                                variant="link"
                                key="button"
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        // y: -10,
                                    },
                                    // hidden: i => ( {
                                    //     opacity: 1,
                                    // 		transition: {
                                    // 			delay: i * 0.05
                                    // 		}
                                    // } ),
                                    visible: {
                                        opacity: 1,
                                        // y: 0,
                                        // transition: {
                                        //     delay: 3 * 0.05,
                                        // },
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                                isLoading={loading}
                            >
                                More results...
                            </MotionButton>
                        ) : (
                            <Divider />
                        )}
                    </VStack>
                </AnimatePresence>
            )}
        </Box>
    )
}

export default SearchView
