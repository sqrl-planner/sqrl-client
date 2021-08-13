import { useLazyQuery } from "@apollo/client"
import { AddIcon } from "@chakra-ui/icons"
import {
    Box,
    Button,
    ButtonProps,
    Divider,
    Flex,
    FlexProps,
    FormControl,
    FormHelperText,
    Input,
    Skeleton,
    Spinner,
    Text,
    Tooltip,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import { QuestionIcon } from "@chakra-ui/icons"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { GET_COURSE_BY_ID } from "../../operations/queries/getCourseById"
import { SEARCH_COURSES } from "../../operations/queries/searchCourses"
import { usePreferences } from "../../PreferencesContext"
import { useAppContext } from "../../SqrlContext"
import { breakdownCourseCode } from "../../utils/course"

const MotionFlex = motion<FlexProps>(Flex)
const MotionButton = motion<ButtonProps>(Button)

const SearchView = ({
    searchQuery,
    setSearchQuery,
}: {
    searchQuery: string
    setSearchQuery: Function
}) => {
    const searchRef = useRef() as MutableRefObject<HTMLInputElement>
    // const [searchQuery, setSearchQuery] = useState<string>("")
    const [searchOffset, setSearchOffset] = useState<number>(0)
    const [chosenCourse, setChosenCourse] = useState("")

    const hoverBackground = useColorModeValue("gray.100", "gray.600")

    const { dispatch } = useAppContext()

    useEffect(() => {
        searchRef.current.focus()
    })

    if (searchRef.current) {
        searchRef.current.focus()
    }

    const [search, { loading, data, error, fetchMore }] =
        useLazyQuery(SEARCH_COURSES)

    const debounced = useDebouncedCallback((query) => {
        if (!query) return
        search({ variables: { query, offset: searchOffset } })
    }, 300)

    const debouncedZero = useDebouncedCallback((query) => {
        if (!query) return
        search({ variables: { query, offset: searchOffset } })
    }, 0)

    useEffect(() => {
        if (!searchQuery) return

        debouncedZero(searchQuery)
    }, [])

    const [
        getFullCourse,
        {
            loading: fullCourseLoading,
            data: fullCourseData,
            error: fullCourseError,
        },
    ] = useLazyQuery(GET_COURSE_BY_ID, {
        onCompleted: (data) => {
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

    return (
        <Box width="100%" height="100%">
            <FormControl p={5} py={7} pb={4}>
                <Input
                    boxShadow="1px 1px 8px -4px rgba(0, 0, 0, 0.4)"
                    placeholder="Search for anything"
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
                <FormHelperText
                    mt={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box>
                        Try "
                        <Button
                            variant="link"
                            fontSize="sm"
                            onClick={() => {
                                setSearchQuery("breadth 2")
                                debouncedZero("breadth 2")
                            }}
                        >
                            breadth 2
                        </Button>
                        ", "
                        <Button
                            variant="link"
                            fontSize="sm"
                            width="auto"
                            onClick={() => {
                                setSearchQuery("PSY")
                                debouncedZero("PSY")
                            }}
                        >
                            PSY
                        </Button>
                        ", or "
                        <Button
                            variant="link"
                            fontSize="sm"
                            onClick={() => {
                                setSearchQuery("linear algebra")
                                debouncedZero("linear algebra")
                            }}
                        >
                            linear algebra
                        </Button>
                        ".
                    </Box>
                    <Button variant="link" fontSize="sm">
                        <QuestionIcon mr={1} /> Help
                    </Button>
                </FormHelperText>
            </FormControl>
            <AnimateSharedLayout>
                <AnimatePresence>
                    {(loading || error) && (
                        // (
                        //     <Flex width="100%" justifyContent="center">
                        //         <Spinner speed="0.6s" />
                        //     </Flex>
                        // )
                        <Flex
                            flexDirection="column"
                            position="absolute"
                            top="8rem"
                            width="100%"
                        >
                            {[...new Array(5)].map((_, i) => (
                                <MotionFlex
                                    width="100%"
                                    flexDirection="column"
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: -10,
                                            transition: (i: number) => ({
                                                delay: i * 0.15,
                                            }),
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
                                    <Skeleton
                                        width="30%"
                                        height={6}
                                        my={1}
                                        mt={2}
                                    />
                                    <Skeleton
                                        width="100%"
                                        height={12}
                                        my={1}
                                        mb={2}
                                    />
                                </MotionFlex>
                            ))}
                        </Flex>
                    )}
                    {!error && !!data && (
                        <VStack
                            alignItems="flex-start"
                            spacing={0}
                            opacity={fullCourseLoading ? 0.6 : 1}
                        >
                            {!!data.searchCourses.length &&
                                data.searchCourses.map(
                                    (course: any, i: number) => {
                                        const { department, numeral, suffix } =
                                            breakdownCourseCode(course.code)
                                        return (
                                            <MotionFlex
                                                key={course.id}
                                                layout
                                                layoutId={course.id}
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
                                                py={3}
                                                boxShadow={`inset 0 2px 3px -3px rgba(0,0,0,0.5)`}
                                                _hover={{
                                                    background: hoverBackground,
                                                }}
                                                _last={{
                                                    marginBottom: 4,
                                                }}
                                                tabIndex={0}
                                                onClick={() => {
                                                    if (fullCourseLoading)
                                                        return

                                                    setChosenCourse(course.id)

                                                    getFullCourse({
                                                        variables: {
                                                            id: course.id,
                                                        },
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
                                                    chosenCourse ===
                                                        course.id ? (
                                                        <Spinner size="sm" />
                                                    ) : (
                                                        <AddIcon
                                                            size="md"
                                                            h={4}
                                                            w={4}
                                                        />
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
                                                                {department +
                                                                    numeral}
                                                            </Text>
                                                            <Text as="span">
                                                                {suffix}
                                                            </Text>
                                                            <Text
                                                                as="span"
                                                                ml={1}
                                                            >
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
                                                        <VStack
                                                            fontSize="0.7em"
                                                            fontWeight={700}
                                                            opacity={0.7}
                                                            spacing={0}
                                                            alignItems="flex-end"
                                                        >
                                                            <Text>
                                                                {course.campus
                                                                    .toUpperCase()
                                                                    .replace(
                                                                        /_/g,
                                                                        " "
                                                                    )}
                                                            </Text>
                                                            {(() => {
                                                                const categories =
                                                                    course.breadthCategories.match(
                                                                        /\d/g
                                                                    )
                                                                if (!categories)
                                                                    return ""
                                                                return (
                                                                    <Text>
                                                                        <Text
                                                                            as="span"
                                                                            fontWeight={
                                                                                500
                                                                            }
                                                                            opacity={
                                                                                0.8
                                                                            }
                                                                        >
                                                                            {categories.length >
                                                                            1
                                                                                ? "BREADTHS"
                                                                                : "BREADTH"}
                                                                        </Text>{" "}
                                                                        {categories
                                                                            .sort()
                                                                            .join(
                                                                                ", "
                                                                            )}
                                                                    </Text>
                                                                )
                                                            })()}
                                                        </VStack>
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
                                    }
                                )}
                            {!loading && !data.searchCourses.length && (
                                <Flex
                                    width="100%"
                                    justifyContent="center"
                                    mb={8}
                                    fontWeight={500}
                                >
                                    No results for "{searchQuery}".
                                </Flex>
                            )}
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
                                <Tooltip label="No more results.">
                                    <Divider
                                        style={{
                                            marginTop: `calc(var(--chakra-space-4) * -1)`,
                                        }}
                                        _after={{
                                            content: `""`,
                                            height: 8,
                                            width: "100%",
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </VStack>
                    )}
                </AnimatePresence>
            </AnimateSharedLayout>
        </Box>
    )
}

export default SearchView
