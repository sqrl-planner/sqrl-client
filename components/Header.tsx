import PreferencesDrawer from "./preferences/PreferencesDrawer"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ShareModal from "./ShareModal"
import styled from "styled-components"
import Image from "next/image"
import SqrlLogo from "../public/sqrl-logo.png"
import {
  Button,
  chakra,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useDisclosure,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  Box,
} from "@chakra-ui/react"
import {
  CalendarIcon,
  EditIcon,
  Icon,
  InfoIcon,
  SettingsIcon,
} from "@chakra-ui/icons"
import { FaShareSquare } from "react-icons/fa"
import { useAppContext } from "../src/SqrlContext"
import { useTranslation } from "next-i18next"
import AboutModal from "./AboutModal"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Link from "next/link"
import useTimetable from "../src/useTimetable"
import { BiDuplicate } from "react-icons/bi"
import useSections from "../src/useSections"

const HeaderComponent = styled(chakra.header)`
  display: grid;
  grid-template-columns: 1fr auto auto;
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

  if (!editable) return <React.Fragment></React.Fragment>

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

  const { allowedToEdit, updateName } = useTimetable({
    id: (router.query.id as string) || "",
  })

  const { name } = useSections({ id: (router.query.id as string) || "" })

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

  const { t } = useTranslation("common")
  const blue = useColorModeValue("blue.700", "blue.400")

  const [timetableName, setTimetableName] = useState("")

  useEffect(() => {
    if (name) setTimetableName(name)
  }, [name])

  return (
    <HeaderComponent bg={useColorModeValue("gray.75", "gray.700")}>
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
      <ShareModal isOpen={isShareOpen} onClose={onCloseShare} />
      <Flex alignItems="center">
        {
          <Heading
            m={4}
            ml={6}
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            position="relative"
          >
            {/* Sqrl */}
            <Link href="/">
              <a>
                <Box w={20} h={10}>
                  <Image src={SqrlLogo} layout="fill" objectFit="contain" />
                </Box>
              </a>
            </Link>
          </Heading>
        }

        {/* <Heading as="h2" ml={4} fontSize={{ base: "xl", md: "2xl" }}> */}
        <Editable
          display="flex"
          alignItems="center"
          value={timetableName}
          onChange={(text: string) => setTimetableName(text)}
          onSubmit={(text: string) => updateName(text)}
          fontSize={{ base: "xl", md: "2xl" }}
          ml={4}
          isDisabled={!allowedToEdit}
        >
          <EditablePreview />
          <EditableInput />
          <TimetableName editable={allowedToEdit} />
        </Editable>
        {/* </Heading> */}
      </Flex>

      {allowedToEdit && (
        <Input
          as="button"
          boxShadow="1px 1px 8px -5px rgba(0, 0, 0, 0.4)"
          ref={buttonRef}
          position="absolute"
          width={{ base: "30%", lg: "40%" }}
          maxWidth="400px"
          fontWeight={500}
          opacity={0.8}
          top="0"
          right={{ base: 20, lg: "0" }}
          bottom="0"
          left="0"
          margin="auto"
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            e.preventDefault()
            setSidebarOpen(true)
            dispatch({ type: "SET_SIDEBAR", payload: 0 })
          }}
        >
          {/* `${t("search-anything")} */}
          Search{" "}
          <chakra.span display={{ base: "none", lg: "inline" }}>
            for anything
          </chakra.span>{" "}
          {`(${osModifier}K)`}
        </Input>
      )}

      <Flex alignItems="center">
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
              Share
            </chakra.span>
          </Button>
        ) : (
          <Button
            shadow="sm"
            variant="solid"
            colorScheme="blue"
            bg={blue}
            onClick={() => {}}
            mr={{ base: 2, xl: 6 }}
          >
            <Icon mr={{ md: 2 }} as={BiDuplicate} />
            Duplicate timetable
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
              About
            </chakra.span>
          </Button>
          <Button onClick={onOpenSettings}>
            <Icon mr={{ xl: 2 }} as={SettingsIcon} />
            <chakra.span display={{ base: "none", xl: "inline" }}>
              Preferences
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
