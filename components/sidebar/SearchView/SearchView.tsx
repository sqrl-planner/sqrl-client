import { useLazyQuery } from "@apollo/client"
import { SearchIcon } from "@chakra-ui/icons"
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
  VStack,
  InputRightElement,
  InputGroup,
  CloseButton,
  InputLeftElement,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import React, {
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDebouncedCallback } from "use-debounce"
import { SEARCH_COURSES } from "../../../operations/queries/searchCourses"
import SearchResults from "./SearchResults"
import SearchViewHints from "./SearchViewHints"

const MotionFlex = motion<FlexProps>(Flex)
const MotionButton = motion<ButtonProps>(Button)

type Props = {
  searchQuery: string
  setSearchQuery: Dispatch<React.SetStateAction<string>>
  searchOffset: number
  setSearchOffset: Dispatch<React.SetStateAction<number>>
  chosenCourse: string
  setChosenCourse: Dispatch<React.SetStateAction<string>>
}

const SearchView = ({
  searchQuery,
  setSearchQuery,
  searchOffset,
  setSearchOffset,
  chosenCourse,
  setChosenCourse,
}: Props) => {
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>
  const [searchLimit, setSearchLimit] = useState<number>(7)

  const [search, { loading, data, error, fetchMore }] =
    useLazyQuery(SEARCH_COURSES)

  const debounced = useDebouncedCallback((query) => {
    if (!query) return
    search({ variables: { query, offset: searchOffset, limit: searchLimit } })
  }, 300)

  const debouncedZero = useDebouncedCallback((query) => {
    if (!query) return
    search({ variables: { query, offset: searchOffset, limit: searchLimit } })
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
    setSearchOffset(0)
    debounced(searchQuery)
  }, [debounced, setSearchOffset, searchQuery])

  useEffect(() => {
    if (searchOffset === 0) return

    search({
      variables: {
        query: searchQuery,
        offset: searchOffset,
        limit: searchLimit,
      },
    })
  }, [search, searchQuery, searchLimit, searchOffset])

  const { t } = useTranslation(["common", "sidebar"])

  return (
    <Box width="100%" height="100%">
      <FormControl p={5} py={7} pb={4}>
        <InputGroup>
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
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <InputRightElement>
            {searchQuery && <CloseButton onClick={() => setSearchQuery("")} />}
          </InputRightElement>
        </InputGroup>
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
            <Flex pt={4} px={6} w="full" justifyContent="space-between">
              {searchOffset > 0 && (
                <MotionButton
                  p={2}
                  variant="link"
                  key="previous"
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
                  onClick={() => {
                    setSearchOffset((prev) => {
                      const newSearchOffset = prev - searchLimit
                      if (newSearchOffset === 0) {
                        debouncedZero(searchQuery)
                      }
                      return newSearchOffset
                    })
                  }}
                >
                  &lt;- Previous
                </MotionButton>
              )}
              {data.searchCourses.length > 6 ? (
                <React.Fragment>
                  <MotionButton
                    p={2}
                    ml="auto"
                    variant="link"
                    key="next"
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
                    onClick={() => {
                      setSearchOffset((prev) => prev + searchLimit)
                    }}
                  >
                    Next -&gt;
                  </MotionButton>
                </React.Fragment>
              ) : (
                <Tooltip label="No more results.">
                  <Divider
                    position="absolute"
                    w="full"
                    left={0}
                    right={0}
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
            </Flex>
          </VStack>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default SearchView
