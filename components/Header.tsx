import PreferencesDrawer from "./preferences/PreferencesDrawer"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ShareModal from "./ShareModal"
import styled from "styled-components"
import {
  Button,
  chakra,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react"
import { CalendarIcon, Icon, InfoIcon, SettingsIcon } from "@chakra-ui/icons"
import { FaShareSquare } from "react-icons/fa"
import { useAppContext } from "../src/SqrlContext"
import { useTranslation } from "next-i18next"
import AboutModal from "./AboutModal"

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

const Header = ({ setSidebarOpen }: { setSidebarOpen: any }) => {
  const { dispatch } = useAppContext()
  const buttonRef = useRef<any | null>(null)

  const [osModifier, setOsModifier] = useState("")

  useEffect(() => {
    if (navigator.userAgent.indexOf("Mac OS X") !== -1) setOsModifier("⌘")
    if (navigator.userAgent.indexOf("Windows") !== -1) setOsModifier("Ctrl + ")
  }, [])

  const keydownListener = useCallback(
    (e) => {
      if (!buttonRef.current) return
      if (e.repeat) return

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSidebarOpen(true)
        dispatch({ type: "SET_SIDEBAR", payload: 0 })
        // searchRef.current.focus()
      }
    },
    [dispatch, buttonRef, setSidebarOpen]
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

  return (
    <HeaderComponent bg={useColorModeValue("gray.75", "gray.700")}>
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
      <ShareModal isOpen={isShareOpen} onClose={onCloseShare} />
      <Heading
        m={4}
        ml={6}
        as="h1"
        size="xl"
        _before={{
          content: `"for ${2022}-${2023}"`,
          fontSize: "0.65rem",
          width: "auto",
          textAlign: "center",
          textTransform: "uppercase",
          position: "absolute",
          bottom: "-0.8rem",
          left: "-0.15rem",
          whiteSpace: "nowrap",
          opacity: 0.7,
        }}
        position="relative"
        bottom="0.5rem"
      >
        Sqrl
      </Heading>
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
        onClick={(e) => {
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

      <Flex alignItems="center">
        <Button
          shadow="sm"
          variant="solid"
          colorScheme="blue"
          bg={useColorModeValue("blue.700", "blue.400")}
          onClick={onOpenShare}
          mr={{base: 2, xl: 6}}
        >
          <Icon mr={{ xl: 2 }} as={FaShareSquare} />
          <chakra.span display={{ base: "none", xl: "inline" }}>
            Share
          </chakra.span>
        </Button>
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
