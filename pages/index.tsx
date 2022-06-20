import { ApolloProvider, useLazyQuery, useMutation } from "@apollo/client"
import { useDebouncedCallback } from "use-debounce"
import { PlusSquareIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  chakra,
  ChakraProvider,
  CloseButton,
  Container,
  extendTheme,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { BiPlus } from "react-icons/bi"
import { BsPlusCircleFill } from "react-icons/bs"
import DisclaimerModal from "../components/DisclaimerModal"
import { CREATE_TIMETABLE } from "../operations/mutations/createTimetable"
import client from "../src/apollo-client"
import { PreferencesProvider } from "../src/PreferencesContext"
import Sqrl from "../src/Sqrl"
import Image from "next/image"
import SqrlLogo from "../public/sqrl-logo.png"
import Head from "next/head"
import Fuse from "fuse.js"

export const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "interstate-mono, monospace",
  },
  colors: {
    pinkish: {
      50: "#ffc7c7",
    },
    gray: {
      75: "#fafafa",
      50: "#F7FAFC",
      650: "#424b5c",
    },
    blue: {
      50: "#cffafe",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      // 700: '#0e7490',
      700: "rgb(59, 144, 173)",
      800: "#155e75",
      900: "#164e63",
    },
  },
  colorSchemes: {
    pinkish: "#ffc7c7",
  },
  components: {
    FormLabel: {
      baseStyle: {
        display: "flex",
        alignItems: "center",
      },
    },
  },
})

const Dashboard = () => {
  const router = useRouter()
  const toast = useToast()

  const [createTimetable] = useMutation(CREATE_TIMETABLE)

  const [newLoading, setNewLoading] = useState(false)

  const [timetables, setTimetables] = useState<{
    [id: string]: { key: string; name: string }
  }>({})

  const [timetablesToDisplay, setTimetablesToDisplay] = useState<{
    [id: string]: { key: string; name: string }
  }>({})

  const [fuse, setFuse] = useState<Fuse<any>>()

  useEffect(() => {
    setFuse(
      new Fuse(Object.entries(timetables), {
        keys: [
          {
            name: "1.name",
          },
        ],
      })
    )
  }, [timetables])

  const [disclaimed, setDisclaimed] = useState<boolean>(true)
  useEffect(() => {
    const lsDisclaimed = localStorage.getItem("disclaimed")

    if (lsDisclaimed) {
      return setDisclaimed(JSON.parse(lsDisclaimed) as boolean)
    }
    setDisclaimed(false)
  }, [disclaimed, setDisclaimed])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [sortBy, setSortBy] = useState<"custom" | "edit" | "create">("custom")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (disclaimed) onClose()
    if (!disclaimed) onOpen()
  }, [disclaimed, onOpen, onClose])

  useEffect(() => {
    const prevLsTimetablesJSON = localStorage.getItem("timetables")
    let prevLsTimetables = {}
    if (prevLsTimetablesJSON)
      prevLsTimetables = JSON.parse(prevLsTimetablesJSON)

    setTimetables(
      prevLsTimetables as { [id: string]: { key: string; name: string } }
    )
  }, [])

  const debounced = useDebouncedCallback((query) => {
    if (!query) return
    const normalizedSearchQuery = searchQuery.trim().toLowerCase()
    setTimetablesToDisplay(
      fuse
        ? Object.fromEntries(
            fuse
              ? fuse.search(normalizedSearchQuery).map((entry) => entry.item)
              : []
          )
        : {}
    )
  }, 200)

  useEffect(() => {
    if (searchQuery === "") return setTimetablesToDisplay(timetables)

    debounced(searchQuery)
  }, [timetables, setTimetablesToDisplay, searchQuery])

  const createNewTimetable = () => {
    setNewLoading(true)

    createTimetable({
      onCompleted: (data) => {
        const {
          key,
          timetable: { id, name },
        } = data.createTimetable
        localStorage.setItem(
          "timetables",
          JSON.stringify({
            ...timetables,
            [id]: { key, name },
          })
        )

        router.push(`/timetable/${id}`)
      },
    })
  }

  const [pageLoading, setPageLoading] = useState("")

  return (
    <React.Fragment>
      <Head>
        <title>Sqrl Planner</title>
      </Head>
      <DisclaimerModal
        disclosure={{ isOpen, onOpen, onClose }}
        ModalProps={{
          isOpen,
          onClose,
        }}
      />
      <Box
        display="flex"
        w="100%"
        h="100%"
        minH="100vh"
        backgroundColor={useColorModeValue("#EBEBE4", "#14141B")}
        position="relative"
      >
        <Container
          maxW={{ base: "6xl", "2xl": "8xl" }}
          pt="8rem"
          display="flex"
          flexDirection="column"
          gap={6}
        >
          {/* <Flex gap={4} alignItems="center"> */}
          {/*   <Box as={motion.div} key="sqrl-logo" layoutId="sqrl-logo" w={14} h={14} position="relative"> */}
          {/*     <Image src={SqrlLogo} layout="fill" objectFit="contain" /> */}
          {/*   </Box> */}
          {/*   <Heading as="h1" fontSize="4xl" fontWeight={600}> */}
          {/*     Sqrl */}
          {/*   </Heading> */}
          {/* </Flex> */}

          <Flex justifyContent="space-between">
            <Flex>
              <Select
                shadow="sm"
                fontWeight={500}
                bg={useColorModeValue("white", "gray.700")}
                value={searchQuery === "" ? sortBy : "relevance"}
                disabled={searchQuery !== ""}
                onChange={(e) =>
                  setSortBy(e.target.value as "custom" | "edit" | "create")
                }
              >
                {/* <option value="custom">Custom</option> */}
                {/* <option value="edit">Last edited</option> */}
                <option value="create">Creation date</option>
                <option disabled value="relevance">
                  Relevance
                </option>
              </Select>
            </Flex>
            <Flex>
              <InputGroup>
                <Input
                  width="xs"
                  bg={useColorModeValue("white", "gray.700")}
                  shadow="sm"
                  placeholder={"Search"}
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
                  {searchQuery && (
                    <CloseButton onClick={() => setSearchQuery("")} />
                  )}
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Flex>

          <SimpleGrid
            alignItems="start"
            // justifyContent="start"
            // justifyItems="start"
            columns={{ base: 2, md: 3 }}
            spacing={6}
            rounded="lg"
            pb={48}
          >
            <AnimatePresence>
              {Object.entries(timetablesToDisplay).map(([id, timetable], i) => {
                return (
                  <Link key={id} href={`/timetable/${id}`}>
                    <motion.a
                      key={id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * i }}
                      onClick={(e) => {
                        if (pageLoading) e.preventDefault()
                      }}
                    >
                      <Box
                        shadow="lg"
                        alignItems="center"
                        rounded="xl"
                        background="blue.700"
                        color="white"
                        fontSize="lg"
                        display="flex"
                        gap={2}
                        p={6}
                        px={8}
                        minH="2xs"
                        fontWeight="medium"
                        position="relative"
                        opacity={!!pageLoading ? "0.5" : "1"}
                        cursor={!!pageLoading ? "not-allowed" : "pointer"}
                        onClick={() => {
                          if (pageLoading) return
                          setPageLoading(id)
                        }}
                      >
                        <Flex
                          pr={8}
                          lineHeight="1.2em"
                          fontSize="3xl"
                          alignItems="center"
                          gap={2}
                          position="absolute"
                          bottom={6}
                          fontWeight={600}
                        >
                          {timetable.name}
                          {pageLoading === id && <Spinner m={0} />}
                        </Flex>
                      </Box>
                    </motion.a>
                  </Link>
                )
              })}
              <Button
                border="4px dashed"
                rounded="xl"
                color="blue.700"
                borderColor="blue.500"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding={12}
                disabled={newLoading}
                onClick={createNewTimetable}
                minH="2xs"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  position="relative"
                  bottom="1"
                >
                  <Box fontSize="4xl">{newLoading ? <Spinner /> : "+"}</Box>
                  <Box>Create a new timetable</Box>
                </Box>
              </Button>
            </AnimatePresence>
          </SimpleGrid>
        </Container>
        <Box
          as={motion.div}
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          position="fixed"
          bottom={20}
          left={0}
          right={0}
          margin="auto"
          width="34rem"
          background={useColorModeValue("white", "black")}
          p={4}
          shadow="2xl"
          rounded="full"
        >
          <Tabs variant="soft-rounded" align="center">
            <TabList>
              <Tab>My timetables</Tab>
              <Tab isDisabled>Shared with me</Tab>
              <Tab isDisabled>Templates</Tab>
              <Tab isDisabled>Settings</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export const Home: NextPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Dashboard />
      </ApolloProvider>
    </ChakraProvider>
  )
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "sidebar",
        "preferences",
      ])),
    },
  }
}

export default Home
