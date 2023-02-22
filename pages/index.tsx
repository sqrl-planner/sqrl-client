import { useMutation } from "@apollo/client"
import { useDebouncedCallback } from "use-debounce"
import {
  Box,
  Container,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import DisclaimerModal from "../components/DisclaimerModal"
import { CREATE_TIMETABLE } from "../operations/mutations/createTimetable"
import Head from "next/head"
import Fuse from "fuse.js"
import { useTranslation } from "next-i18next"
import AboutModal from "../components/AboutModal"
import Layout from "../components/Layout"
import { FaMoon, FaSun } from "react-icons/fa"
import { IconType } from "react-icons"

/**
 * Darkens a color by a percentage
 * @param hexColor A hex color with a hashtag, like #ABCDEF
 * @param percentage A positive real number
 *    Values from 0-1 make the color darker
 *    A value of 1 keeps the color the same
 *    Values greater than 1 make the color brighter, up to FFFFFF
 */
function changeColor(hexColor: string, percentage: number): string {
  const changeChannel = (twoDigitHex: string): string => {
    const base10Number = Math.floor(parseInt(twoDigitHex, 16) * percentage)
    const constrained = Math.min(Math.max(0, base10Number), 255) // Put in [0, 255] range
    const stringRep = constrained.toString(16)
    return stringRep.length === 1 ? "0" + stringRep : stringRep
  }

  const red = changeChannel(hexColor.slice(1, 3))
  const green = changeChannel(hexColor.slice(3, 5))
  const blue = changeChannel(hexColor.slice(5, 7))

  return "#" + red + green + blue
}

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
  const [longLoadTime, setLongLoadTime] = useState(false)

  useEffect(() => {
    if (!pageLoading && !newLoading) return

    const t = setTimeout(() => {
      setLongLoadTime(true)
    }, 1100)

    return () => clearTimeout(t)
  }, [pageLoading, newLoading])

  const [tabIndex, setTabIndex] = useState(0)

  const {
    isOpen: isAboutOpen,
    onOpen: onOpenAbout,
    onClose: onCloseAbout,
  } = useDisclosure()

  const { colorMode, toggleColorMode } = useColorMode()

  const { t } = useTranslation("index")

  // Differences in the UI between light and dark mode
  // Mostly for icons/hover
  interface ModeConfig {
    tLabel: string
    icon: IconType
    iconId: string
    hoverFactor: number
  }
  const modeConfig: ModeConfig = {
    light: {
      tLabel: "light-mode",
      icon: FaSun,
      iconId: "sun-icon",
      hoverFactor: 0.9,
    },
    dark: {
      tLabel: "dark-mode",
      icon: FaMoon,
      iconId: "moon-icon",
      hoverFactor: 1.1,
    },
  }[colorMode]

  return (
    <React.Fragment>
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
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
            <Text fontSize="2xl" fontWeight="medium">Sqrl Planner is down for maintenance.</Text>
          {/* <Flex justifyContent="space-between">
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
                <option value="create">{t("by-creation-date")}</option>
                <option
                  style={{
                    display: "none",
                  }}
                  disabled
                  value="relevance"
                >
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
                  placeholder={t("search")}
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
                        transition="background 75ms linear"
                        position="relative"
                        opacity={!!pageLoading ? "0.5" : "1"}
                        cursor={!!pageLoading ? "not-allowed" : "pointer"}
                        _hover={{
                          background: changeColor(
                            theme.colors.blue[600],
                            modeConfig.hoverFactor
                          ), // blue[700] doesn't work here
                        }}
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
                          {pageLoading === id && longLoadTime
                            ? "Working..."
                            : timetable.name}
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
                  <Box>
                    {longLoadTime && newLoading
                      ? "Working..."
                      : t("create-timetable")}
                  </Box>
                </Box>
              </Button>
            </AnimatePresence>
          </SimpleGrid> */}
        </Container>
        {/* <Box
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
          width="35rem"
          background={useColorModeValue("white", "black")}
          p={4}
          shadow="2xl"
          rounded="full"
        >
          <Tabs
            variant="solid-rounded"
            align="center"
            index={tabIndex}
            onChange={(index) => {
              if (index === 2 || index === 3) return
              setTabIndex(index)
            }}
          >
            <TabList>
              <Tab>{t("my-timetables")}</Tab>
              <Tooltip label="Coming soon" shouldWrapChildren>
                <Tab isDisabled>{t("shared-with")}</Tab>
              </Tooltip>
              <Tab onClick={onOpenAbout}>{t("common:about")}</Tab>
              <Tab onClick={toggleColorMode}>
                <AnimatePresence exitBeforeEnter>
                  <React.Fragment>
                    <motion.div
                      key={modeConfig.iconId}
                      initial={{
                        opacity: 0,
                        y: -15,
                        rotate: -45,
                      }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                    >
                      <Icon as={modeConfig.icon} mr={2} />
                    </motion.div>{" "}
                    {t(modeConfig.tLabel)}
                  </React.Fragment>
                </AnimatePresence>
              </Tab>
            </TabList>
          </Tabs>
        </Box> */}
      </Box>
    </React.Fragment>
  )
}

export const Home: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "sidebar",
        "preferences",
        "modal",
        "index",
      ])),
    },
  }
}

export default Home
