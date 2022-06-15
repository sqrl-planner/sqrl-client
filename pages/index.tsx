import { ApolloProvider, useLazyQuery, useMutation } from "@apollo/client"
import { PlusSquareIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  chakra,
  ChakraProvider,
  Container,
  extendTheme,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
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
import { AppContextProvider } from "../src/SqrlContext"

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

  const [disclaimed, setDisclaimed] = useState<boolean>(true)
  useEffect(() => {
    const lsDisclaimed = localStorage.getItem("disclaimed")

    if (lsDisclaimed) {
      return setDisclaimed(JSON.parse(lsDisclaimed) as boolean)
    }
    setDisclaimed(false)
  }, [disclaimed, setDisclaimed])

  const { isOpen, onOpen, onClose } = useDisclosure()

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

  return (
    <Box
      display="flex"
      w="100%"
      h="100%"
      minH="100vh"
      background={useColorModeValue("gray.75", "gray.800")}
      justifyContent="center"
      alignItems="start"
      gap={2}
      pt={20}
    >
      <DisclaimerModal
        disclosure={{ isOpen, onOpen, onClose }}
        ModalProps={{
          isOpen,
          onClose,
        }}
      />
      <Container
        display="flex"
        flexDirection="column"
        maxW="sm"
        gap={4}
        rounded="2xl"
        shadow="2xl"
        m={0}
        p={8}
      >
        <Heading>Sqrl</Heading>
        <Button w="full" variant="solid" colorScheme="blue">
          My timetables
        </Button>
        <Button w="full" variant="outline">
          Shared with me
        </Button>
        <Button mt={10} w="full" variant="outline">
          Settings
        </Button>
      </Container>
      <Container maxW="5xl" m={0}>
        <Heading mb={4} ml={8} size="2xl">
          My timetables
        </Heading>
        <SimpleGrid
          alignItems="start"
          // justifyContent="start"
          // justifyItems="start"
          columns={2}
          spacing={8}
          rounded="lg"
          p={8}
        >
          {Object.entries(timetables).map(([id, timetable]) => {
            return (
              <Link key={id} href={`/timetable/${id}`}>
                <a>
                  <Box
                    shadow="lg"
                    cursor="pointer"
                    rounded="xl"
                    background="blue.500"
                    color="white"
                    fontSize="lg"
                    p={6}
                    px={8}
                    fontWeight="medium"
                  >
                    {timetable.name}
                  </Box>
                </a>
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
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export const Home: NextPage = () => {
  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (localStorage.getItem("disclaimed")) return
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setColorMode("dark")
    }
  }, [setColorMode])

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppContextProvider>
          <Dashboard />
        </AppContextProvider>
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
