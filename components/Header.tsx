import PreferencesDrawer from "./preferences/PreferencesDrawer"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ShareModal from "./ShareModal"
import styled from "styled-components"
import {
  Button,
  chakra,
  Flex,
  Input,
  useColorModeValue,
  useDisclosure,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  Badge,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { EditIcon, Icon, InfoIcon, SettingsIcon } from "@chakra-ui/icons"
import { FaShareSquare } from "react-icons/fa"
import { useAppContext } from "../src/SqrlContext"
import AboutModal from "./AboutModal"
import { useRouter } from "next/router"
import useTimetable from "../src/useTimetable"
import { BiDuplicate } from "react-icons/bi"
import useSections from "../src/useSections"
import { DUPLICATE_TIMETABLE } from "../operations/mutations/duplicateTimetable"
import { useMutation } from "@apollo/client"
import { useTranslation } from "next-i18next"

const HeaderComponent = styled(chakra.header)`
  /* display: grid; */
  /* grid-template-columns: auto auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 4.5rem;
  z-index: 10;
  box-shadow: 0px 1px 8px -5px rgba(0, 0, 0, 0.4);

  @media print {
    display: none;
  }
`

type TimetableNameProps = {
  editable: boolean | null
}

const TimetableName = ({ editable }: TimetableNameProps) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  if (!editable) return <Badge ml={2}>Read only</Badge>

  return (
    <EditIcon
      cursor="pointer"
      ml={2}
      fontSize="0.8em"
      {...getEditButtonProps()}
    />
  )
}

const Header = ({ setSidebarOpen }: { setSidebarOpen: any }) => {
  const { dispatch } = useAppContext()
  const buttonRef = useRef<any | null>(null)

  const [osModifier, setOsModifier] = useState("")

  useEffect(() => {
    if (navigator.userAgent.indexOf("Mac OS X") !== -1) setOsModifier("⌘")
    if (navigator.userAgent.indexOf("Windows") !== -1) setOsModifier("Ctrl + ")
  }, [])

  const router = useRouter()

  const { allowedToEdit } = useTimetable({
    id: (router.query.id as string) || "",
  })

  const { name, updateName } = useSections()

  const keydownListener = useCallback(
    (e: KeyboardEvent) => {
      if (!allowedToEdit) return
      if (!buttonRef.current) return
      if (e.repeat) return

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSidebarOpen(true)
        dispatch({ type: "SET_SIDEBAR", payload: 0 })
      }
    },
    [dispatch, buttonRef, setSidebarOpen, allowedToEdit]
  )

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true)
    return () => window.removeEventListener("keydown", keydownListener, true)
  }, [keydownListener])

  const {
    isOpen: isSettingsOpen,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure()
  const {
    isOpen: isAboutOpen,
    onOpen: onOpenAbout,
    onClose: onCloseAbout,
  } = useDisclosure()
  const {
    isOpen: isShareOpen,
    onOpen: onOpenShare,
    onClose: onCloseShare,
  } = useDisclosure()

  useEffect(() => {
    if (!router.query.settings) return

    const { settings, ...routerQuery } = router.query

    onOpenSettings()
    router.replace({
      query: { ...routerQuery },
    })
  }, [onOpenSettings, router])

  const blue = useColorModeValue("blue.700", "blue.400")

  const [timetableName, setTimetableName] = useState("")

  useEffect(() => {
    if (name) setTimetableName(name)
  }, [name])

  const toast = useToast()

  const [duplicateTimetable] = useMutation(DUPLICATE_TIMETABLE)
  const [loading, setLoading] = useState(false)
  const [sharePrefix, setSharePrefix] = useState("")

  useEffect(() => {
    setSharePrefix(
      `${window.location.protocol}//${window.location.host}/timetable/`
    )
  }, [])

  const id = router.query.id

  const { t } = useTranslation("common")

  return (
    <HeaderComponent bg={useColorModeValue("gray.75", "gray.700")}>
      <Head>
        <title>Sqrl Planner | {name}</title>
        <meta property="og:url" content={`${sharePrefix}${id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Sqrl Planner | ${name}`} />
      </Head>
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
      <ShareModal isOpen={isShareOpen} onClose={onCloseShare} />
      <Flex flex="1" alignItems="center" pl="11rem">
        <Editable
          alignItems="center"
          fontWeight={500}
          opacity={0.8}
          _hover={{
            opacity: 1,
          }}
          transition="all 200ms"
          value={timetableName}
          submitOnBlur={false}
          onChange={(text: string) =>
            setTimetableName((prevName: string) => {
              if (text.length > 40) return prevName
              return text
            })
          }
          onSubmit={(text: string) => {
            if (text === name) return

            updateName(text, () => {
              toast({
                title: `Updated timetable name to "${text}"`,
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            })
          }}
          fontSize={{ base: "lg", md: "xl" }}
          ml={4}
          isDisabled={!allowedToEdit}
          display={{ base: "none", md: "flex" }}
        >
          <EditablePreview
            w="auto"
            maxW="30vw"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          />
          <EditableInput
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          />
          <TimetableName editable={allowedToEdit} />
        </Editable>
        {/* </Heading> */}
      </Flex>

      <Flex
        alignItems="center"
        justifyContent={{ base: "flex-start", md: "end" }}
      >
        {allowedToEdit && (
          <Input
            as="button"
            boxShadow="1px 1px 8px -5px rgba(0, 0, 0, 0.4)"
            ref={buttonRef}
            // position="absolute"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width={{ base: "30%", lg: "40%" }}
            // maxWidth="400px"
            fontWeight={500}
            opacity={0.8}
            mr={{ base: 4, lg: 6 }}
            px={{ base: 4, lg: 6 }}
            // top="0"
            // right={{ base: 20, lg: "0" }}
            // bottom="0"
            // left="0"
            // margin="auto"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.preventDefault()
              setSidebarOpen(true)
              dispatch({ type: "SET_SIDEBAR", payload: 0 })
            }}
          >
            {t("search") + t("for-anything") + " "}
            {/* Search{" "}
          <chakra.span display={{ base: "none", lg: "inline" }}>
            for anything
          </chakra.span>{" "} */}
            {`(${osModifier}K)`}
          </Input>
        )}

        {allowedToEdit ? (
          <Button
            shadow="sm"
            variant="solid"
            colorScheme="blue"
            bg={blue}
            onClick={onOpenShare}
            mr={{ base: 2, xl: 6 }}
          >
            <Icon mr={{ md: 2 }} as={FaShareSquare} />
            <chakra.span display={{ base: "none", md: "inline" }}>
              {t("share")}
            </chakra.span>
          </Button>
        ) : (
          <Button
            shadow="sm"
            variant="solid"
            colorScheme="blue"
            bg={blue}
            onClick={() => {
              const newTimetable = window.open("", "_blank")

              setLoading(true)
              duplicateTimetable({
                variables: {
                  id,
                },
                onCompleted: (data) => {
                  const {
                    key,
                    timetable: { id, name },
                  } = data.duplicateTimetable

                  const prevLsTimetablesJSON =
                    localStorage.getItem("timetables")
                  let timetables = {}
                  if (prevLsTimetablesJSON)
                    timetables = JSON.parse(prevLsTimetablesJSON)

                  localStorage.setItem(
                    "timetables",
                    JSON.stringify({
                      ...timetables,
                      [id]: { key, name },
                    })
                  )

                  if (newTimetable)
                    newTimetable.location.href = `${sharePrefix}${id}`

                  setLoading(false)
                },
              })
            }}
            mr={{ base: 2, xl: 6 }}
            isLoading={loading}
          >
            <Icon mr={{ md: 2 }} as={BiDuplicate} />
            {t("duplicate-table")}
          </Button>
        )}
        <ButtonGroup
          shadow="sm"
          rounded="md"
          variant="outline"
          isAttached
          mr={6}
        >
          <Button onClick={onOpenAbout}>
            <Icon mr={{ xl: 2 }} as={InfoIcon} />
            <chakra.span display={{ base: "none", xl: "inline" }}>
              {t("about")}
            </chakra.span>
          </Button>
          <Button onClick={onOpenSettings}>
            <Icon mr={{ xl: 2 }} as={SettingsIcon} />
            <chakra.span display={{ base: "none", xl: "inline" }}>
              {t("preferences")}
            </chakra.span>
          </Button>
        </ButtonGroup>
      </Flex>
      <PreferencesDrawer
        disclosure={{
          isOpen: isSettingsOpen,
          onOpen: onOpenSettings,
          onClose: onCloseSettings,
        }}
        drawerProps={{
          isOpen: isSettingsOpen,
          placement: "right",
          onClose: onCloseSettings,
        }}
      />
    </HeaderComponent>
  )
}

export default Header
