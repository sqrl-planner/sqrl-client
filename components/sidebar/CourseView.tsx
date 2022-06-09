import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
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
  Text,
  ToastId,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react"
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import reactStringReplace from "react-string-replace"
import { useAppContext } from "../../src/SqrlContext"
import { MeetingCategoryType } from "../timetable/Meeting"
import { breakdownCourseCode, meetingsMissing } from "../../src/utils/course"
import MeetingPicker from "./MeetingPicker"
import { CourseSubheading } from "./OverviewView"
import { useTranslation } from "next-i18next"
import { FaTrashAlt, FaShareSquare } from "react-icons/fa"

const CourseView = ({ setSearchQuery }: { setSearchQuery: Function }) => {
  const {
    state: { courses, sidebarCourse: identifier, userMeetings },
    dispatch,
  } = useAppContext()

  const course = courses[identifier]

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

  useLayoutEffect(() => {
    return () => {
      if (!userMeetings[identifier]) return

      const missing = meetingsMissing(course, userMeetings, identifier)

      if (missing.length == 0) return

      if (toast.isActive("warn-missing-section")) return

      toast({
        id: "warn-missing-section",
        title: "Some courses are missing a section.",
        description: "Check Overview to see missing meetings.",
        status: "warning",
        variant: "solid",
        isClosable: true,
        duration: null,
        onCloseComplete: () => dispatch({ type: "SET_SIDEBAR", payload: 2 }),
      })
    }
  }, [])

  const removePopoverTriggerRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation("common")

  const shareUrl = `https://app.sqrlplanner.com/course/<:id>/share?sections=<:id1>,<:id2>`

  const { onCopy, hasCopied } = useClipboard(shareUrl)

  useEffect(() => {
    if (!hasCopied) return

    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }, [hasCopied])

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
          No course selected.
        </Heading>
        <Text>Pick a course to see information regarding it.</Text>
      </Box>
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
            {(() => {
              if (course.term === "FIRST_SEMESTER") return "F"
              if (course.term === "SECOND_SEMESTER") return "S"
              return "Y"
            })()}
          </Text>
        </Box>
        <Box>
          {/* Breadth category */}
          {course.breadthCategories.trim() !== "" && (
            <Tooltip label={course.breadthCategories}>
              <Text
                fontSize="0.5em"
                backgroundColor="blue.100"
                color="blue.800"
                // colorScheme="blue"
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
                        dispatch({
                          type: "REMOVE_COURSE",
                          payload: identifier,
                        })
                        // onClose()
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
              !Object.keys(userMeetings).some((courseCode) => {
                console.log(courseCode)
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
              !Object.keys(userMeetings).some((courseCode) => {
                console.log(courseCode)
                return courseCode === course.id
              })
            }
            onClick={onCopy}
          >
            <Icon as={FaShareSquare} />
            Share with selections
          </Button>
        </ButtonGroup>
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
