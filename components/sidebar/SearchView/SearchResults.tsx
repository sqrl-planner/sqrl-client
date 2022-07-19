import { AddIcon } from "@chakra-ui/icons"
import {
  Text,
  Flex,
  FlexProps,
  useColorModeValue,
  Box,
  VStack,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { Course } from "../../../src/Course"
import { useAppContext } from "../../../src/SqrlContext"
import { breakdownCourseCode } from "../../../src/utils/course"

type Props = {
  courses: Array<Course>
}

const MotionFlex = motion<FlexProps>(Flex)

const SearchResults = ({ courses }: Props) => {
  const { dispatch } = useAppContext()
  const hoverBackground = useColorModeValue("gray.100", "gray.600")

  return (
    <React.Fragment>
      {courses.map((course: Course, i: number) => {
        const { department, numeral, suffix } = breakdownCourseCode(course.code)
        return (
          <MotionFlex
            key={course.id}
            layout
            layoutId={course.id}
            role="button"
            variants={{
              hidden: {
                opacity: 0,
                y: -10,
              },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.01,
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
              dispatch({
                type: "SET_SIDEBAR",
                payload: 1,
              })
              dispatch({
                type: "SET_SIDEBAR_COURSE",
                payload: course.id,
              })
            }}
            cursor="pointer"
          >
            <Flex ml={5} mr={4} w={4} h={4} alignItems="center">
              <AddIcon h={4} w={4} />
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
                  <Text fontSize="1.25em" as="span" fontWeight={600}>
                    {department + numeral}
                  </Text>
                  <Text as="span">{suffix}</Text>
                  <Text as="span" ml={1}>
                    {(() => {
                      if (course.term === "FIRST_SEMESTER") return "F"
                      if (course.term === "SECOND_SEMESTER") return "S"
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
                  <Text>{course.campus.toUpperCase().replace(/_/g, " ")}</Text>
                  {(() => {
                    const categories = course.breadthCategories.match(/\d/g)
                    if (!categories) return ""
                    return (
                      <Text>
                        <Text as="span" fontWeight={500} opacity={0.8}>
                          {categories.length > 1 ? "BREADTHS" : "BREADTH"}
                        </Text>{" "}
                        {categories.sort().join(", ")}
                      </Text>
                    )
                  })()}
                </VStack>
              </Flex>
              <Text as="span" opacity="0.7" fontSize="0.8em">
                {course.title}
              </Text>
              {/* {course.code}: {course.title} */}
            </Flex>
          </MotionFlex>
        )
      })}
    </React.Fragment>
  )
}

export default SearchResults
