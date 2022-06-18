import { useLazyQuery } from "@apollo/client"
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Flex,
  FlexProps,
  FormControl,
  Input,
  Skeleton,
  Tooltip,
  useColorModeValue,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, {
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDebouncedCallback } from "use-debounce"
import { GET_COURSE_BY_ID } from "../../../operations/queries/getCourseById"
import { SEARCH_COURSES } from "../../../operations/queries/searchCourses"
import { useAppContext } from "../../../src/SqrlContext"
import useTimetable from "../../../src/useTimetable"
import SearchResults from "./SearchResults"
import SearchViewHints from "./SearchViewHints"

const MotionFlex = motion<FlexProps>(Flex)
const MotionButton = motion<ButtonProps>(Button)

const SearchView = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: Dispatch<React.SetStateAction<string>>
}) => {
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>
  const [searchOffset, setSearchOffset] = useState<number>(0)
  const [chosenCourse, setChosenCourse] = useState("")

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
    if (searchRef.current) {
      searchRef.current.focus()
    }
  })

  useEffect(() => {
    if (!searchQuery) return

    debouncedZero(searchQuery)
  }, [])

  useEffect(() => {
    debounced(searchQuery)
  }, [searchQuery])

  const { t } = useTranslation(["common", "sidebar"])

  return (
    <Box width="100%" height="100%">
      <FormControl p={5} py={7} pb={4}>
        <Input
          boxShadow="1px 1px 8px -4px rgba(0, 0, 0, 0.4)"
          placeholder={t("search-anything")}
          ref={searchRef}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value)
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.select()
          }}
        />
        <SearchViewHints
          setSearchQuery={setSearchQuery}
          debouncedZero={debouncedZero}
        />
      </FormControl>
      <AnimatePresence>
        {(loading || error) && (
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
                    y: -1,
                    transition: (i: number) => ({
                      delay: i * 0.1,
                    }),
                  },
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
          </Flex>
        )}
        {!error && !!data && searchQuery && (
          <VStack alignItems="flex-start" spacing={0}>
            {!!data.searchCourses.length && (
              <SearchResults
                chosenCourse={chosenCourse}
                setChosenCourse={setChosenCourse}
                courses={data.searchCourses}
              />
            )}
            {!loading && data.searchCourses.length === 0 && (
              <Flex
                width="100%"
                justifyContent="center"
                mb={8}
                fontWeight={500}
              >
                No results for
                {' "'}
                {searchQuery}
                {'".'}
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
                  },
                  visible: {
                    opacity: 1,
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
    </Box>
  )
}

export default SearchView
