import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { Dispatch, Fragment, useEffect, useRef, useState } from "react"
import reactStringReplace from "react-string-replace"
import { useAppContext } from "../../src/SqrlContext"
import { MeetingCategoryType } from "../timetable/Meeting"
import { breakdownCourseCode, meetingsMissing } from "../../src/utils/course"
import MeetingPicker from "./MeetingPicker"
import { CourseSubheading } from "./OverviewView"
import { useTranslation } from "next-i18next"
import { FaTrashAlt, FaShareSquare } from "react-icons/fa"
import { useRouter } from "next/router"
import useCourses from "../../src/useCourses"
import useSections from "../../src/useSections"
import { motion } from "framer-motion"
import useTimetable from "../../src/useTimetable"
import { SearchIcon } from "@chakra-ui/icons"
import {
  getCourseLetterFromTerm,
  computeSiblingCourseId,
} from "../../src/utils/course"
import { useLazyQuery } from "@apollo/client"
import { CHECK_COURSE_EXISTS } from "../../operations/queries/checkCourseExists"

type Props = {
  setSearchQuery: Dispatch<React.SetStateAction<string>>
}

const CourseView = ({ setSearchQuery }: Props) => {
  const {
    state: {
      // courses,
      sidebarCourse: identifier,
      // userMeetings
    },
    dispatch,
  } = useAppContext()

  const router = useRouter()
  const { sections, removeCourse } = useSections()
  const { courses, userMeetings, loading } = useCourses({
    sections,
  })
  const { allowedToEdit } = useTimetable({ id: router.query.id as string })
  const [siblingCourseId, setSiblingCourseId] = useState<string | null>(null)

  const course = courses[identifier]

  const [checkCourseExists] = useLazyQuery(CHECK_COURSE_EXISTS, {
    errorPolicy: "all",
  })

  useEffect(() => {
    // Cannot put async callback to useEffect, so wrap
    // Check for the sibling course if it exists, and if it does,
    // add the ID of that course to the state. If not, it's null

    // Run the query
    ;(async () => {
      if (!course) return

      const siblingCourseId = computeSiblingCourseId(course)
      if (siblingCourseId === null) return

      const result = await checkCourseExists({
        variables: {
          id: siblingCourseId,
        },
      })

      // I don't know how to show errors in sqrl :/ so return for now
      if (result.error) return

      if (result.data.courseById) {
        // courseById is null when there is course with matching id
        setSiblingCourseId(result.data.courseById.id)
      }
    })()
  }, [course, checkCourseExists])

  // TODO: meetings out of the timetable's display bounds are hidden without warning. Warn them.

  const boxRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    if (!boxRef.current) return
    boxRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [boxRef, course])

  const scrollingTimeoutRef = useRef<any>(null)

  const [scrolling, setScrolling] = useState<boolean>(false)

  const initRef = useRef<HTMLButtonElement>(null)

  const toast = useToast()

  const removePopoverTriggerRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation("common")

  const shareUrl = `https://app.sqrlplanner.com/course/<:id>/share?sections=<:id1>,<:id2>`

  const { onCopy, hasCopied } = useClipboard(shareUrl)

  useEffect(() => {
    if (!course || !userMeetings || !identifier || !userMeetings[identifier])
      return

    const missing = meetingsMissing(course, userMeetings, identifier)

    if (missing.length !== 0) return

    toast.close("warn-missing-section")
  }, [toast, course, userMeetings, identifier])

  useEffect(() => {
    if (!hasCopied) return

    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }, [toast, hasCopied])

  if (!identifier) {
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
          {t("sidebar:no-course-selected")}
        </Heading>
        <Text fontWeight={500} opacity={0.7} mt={2}>
          {t("sidebar:pick-course-description")}
        </Text>
        {allowedToEdit && (
          <Button
            onClick={() => {
              dispatch({ type: "SET_SIDEBAR", payload: 0 })
            }}
            colorScheme="blue"
            bg="blue.700"
            mt={2}
          >
            <SearchIcon mr={2} /> {t("sidebar:search-for-courses")}
          </Button>
        )}
      </Box>
    )
  }

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Box p={5}>
          <Skeleton mb={4} height="40px" />
          <Skeleton>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Skeleton>
          <Stack mt={4}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
          <Stack mt={6}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
          <Stack mt={6}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      </motion.div>
    )
  }

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
            {getCourseLetterFromTerm(course)}
          </Text>
        </Box>
        <Box>
          {/* Breadth category */}
          {course.breadthCategories.trim() !== "" && (
            <Tooltip label={course.breadthCategories}>
              <Text
                fontSize="0.5em"
                backgroundColor="blue.700"
                color="white"
                // colorScheme="blue"
                fontWeight="600"
                shadow="sm"
                p={1}
                px={3}
                borderRadius="100rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {(() => {
                  const categories =
                    course.breadthCategories.match(/\d/g)?.sort() || []
                  return `Breadth${
                    categories?.length > 1 ? "s" : ""
                  } ${categories?.join(", ")}`
                })()}
              </Text>
            </Tooltip>
          )}
        </Box>
      </Heading>
      <Heading as="h4" size="md" opacity="0.6" mb={2} px={5}>
        {course.title}
      </Heading>
      <Flex w="100%" justifyContent="start" py="2" pt={4} px={5}>
        <Popover initialFocusRef={initRef}>
          {({ onClose }) => (
            <Fragment>
              <PopoverTrigger>
                <Button
                  variant="solid"
                  colorScheme="gray"
                  width="0"
                  position="absolute"
                  visibility="hidden"
                  alignItems="center"
                  gap={2}
                  ref={removePopoverTriggerRef}
                >
                  <Icon as={FaTrashAlt} />
                  {t("sidebar:remove")} {course.code}
                </Button>
                {/* <CloseButton /> */}
              </PopoverTrigger>
              <PopoverContent
                style={{
                  boxShadow: "1px 1px 18px -10px rgba(1,1,1,0.5)",
                }}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure?</PopoverHeader>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button variant="ghost" ref={initRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        removeCourse({ courseId: identifier })
                        dispatch({ type: "SET_SIDEBAR", payload: 0 })
                        onClose()
                      }}
                      gap={2}
                    >
                      <Icon as={FaTrashAlt} />
                      {t("sidebar:remove")} {course.code}
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Fragment>
          )}
        </Popover>
        <VStack>
          {siblingCourseId && (
            <ButtonGroup
              isAttached
              display="flex"
              width="100%"
              variant="outline"
              colorScheme="gray"
            >
              <Button
                alignItems="center"
                gap={2}
                onClick={() => {
                  dispatch({
                    type: "SET_SIDEBAR",
                    payload: 1,
                  })
                  dispatch({
                    type: "SET_SIDEBAR_COURSE",
                    payload: siblingCourseId,
                  })
                }}
              >
                {course.term === "FIRST_SEMESTER"
                  ? t("sidebar:see-in-second-semester")
                  : t("sidebar:see-in-first-semester")}
              </Button>
            </ButtonGroup>
          )}
          <ButtonGroup
            isAttached
            display="flex"
            width="100%"
            variant="outline"
            colorScheme="gray"
          >
            <Button
              alignItems="center"
              gap={2}
              onClick={() => {
                if (!removePopoverTriggerRef.current) return
                removePopoverTriggerRef.current.click()
              }}
              disabled={
                !allowedToEdit ||
                !Object.keys(userMeetings).some((courseCode) => {
                  return courseCode === course.id
                })
              }
            >
              <Icon as={FaTrashAlt} />
              {t("sidebar:remove")}
            </Button>

            <Button
              alignItems="center"
              gap={2}
              disabled={
                true ||
                !Object.keys(userMeetings).some((courseCode) => {
                  return courseCode === course.id
                })
              }
              onClick={onCopy}
            >
              <Icon as={FaShareSquare} />
              Share with selections
            </Button>
          </ButtonGroup>
        </VStack>
      </Flex>
      {Object.values(MeetingCategoryType).map((method) => (
        <MeetingPicker
          key={method}
          method={method}
          course={course}
          scrolling={scrolling}
        />
      ))}

      <Box>
        <Accordion
          allowToggle
          mt={4}
          borderColor="rgba(0,0,0,0)"
          defaultIndex={0}
        >
          <AccordionItem>
            <AccordionButton
              p={0}
              px={5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <CourseSubheading my={2} px={5}>
                {t("sidebar:description")}
              </CourseSubheading>
              {/* <AccordionIcon mr={5} /> */}
              <Icon as={AccordionIcon} mr={5} />
            </AccordionButton>
            <AccordionPanel px={5} pt={0} pb={2}>
              {!course.description.trim() && (
                <Text>No description available.</Text>
              )}
              <Text
                className="course-info"
                dangerouslySetInnerHTML={{
                  __html: course.description.replace(
                    /<a/g,
                    '<a target="blank"'
                  ),
                }}
              ></Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      {!!course.prerequisites.length && (
        <Box mx={5}>
          <CourseSubheading>{t("sidebar:prerequisites")}</CourseSubheading>
          <Text>
            {reactStringReplace(
              course.prerequisites
                // replace html tags
                .replace(/(<([^>]+)>)/gi, "")
                .replace(/&amp;/g, "&"),
              // three to four alpha characters, two to four digits, H or Y, and a digit
              /([A-Za-z]{3,4}\d{2,4}[H,Y]\d?)/g,
              (match, i) => (
                <Button
                  variant="link"
                  colorScheme="gray"
                  key={i}
                  p={1}
                  fontFamily="interstate-mono, monospace"
                  onClick={() => {
                    dispatch({
                      type: "SET_SIDEBAR",
                      payload: 0,
                    })
                    setSearchQuery(match)
                  }}
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
              course.exclusions
                // replace html tags
                .replace(/(<([^>]+)>)/gi, "")
                .replace(/&amp;/g, "&"),
              /([A-Za-z]{3,4}\d{2,4}[H,Y]\d?)/g,
              (match, i) => (
                <Button
                  variant="link"
                  key={i}
                  p={1}
                  fontFamily="interstate-mono, monospace"
                  onClick={() => {
                    dispatch({
                      type: "SET_SIDEBAR",
                      payload: 0,
                    })
                    setSearchQuery(match)
                  }}
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
            className="course-info"
            dangerouslySetInnerHTML={{
              __html: course.webTimetableInstructions.replace(
                /<a/g,
                '<a target="blank"'
              ),
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

export default CourseView
