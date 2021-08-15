import { CalendarIcon, Icon, SettingsIcon } from "@chakra-ui/icons"
import {
    FormHelperText,
    Button,
    chakra,
    Flex,
    Heading,
    Input,
    useColorModeValue,
    useDisclosure,
    Modal,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    FormControl,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FaShareSquare } from "react-icons/fa"
import styled from "styled-components"
import { useAppContext } from "../src/SqrlContext"
import PreferencesDrawer from "./preferences/PreferencesDrawer"
import ShareCalendar from "./ShareCalendar"

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
        if (navigator.userAgent.indexOf("Windows") !== -1)
            setOsModifier("Ctrl + ")
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
        return () =>
            window.removeEventListener("keydown", keydownListener, true)
    }, [keydownListener])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: shareIsOpen,
        onOpen: shareOnOpen,
        onClose: shareOnClose,
    } = useDisclosure()

    const { t } = useTranslation("common")

    return (
        <HeaderComponent bg={useColorModeValue("white", "gray.700")}>
            <Heading
                m={4}
                ml={6}
                as="h1"
                size="xl"
                _before={{
                    content: `"for ${new Date().getFullYear()}-${
                        new Date().getFullYear() + 1
                    }"`,
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
                width="40%"
                maxWidth="400px"
                fontWeight={500}
                opacity={0.8}
                top="0"
                right="0"
                bottom="0"
                left="0"
                margin="auto"
                onClick={(e) => {
                    e.preventDefault()
                    setSidebarOpen(true)
                    dispatch({ type: "SET_SIDEBAR", payload: 0 })
                }}
            >{`${t("search-anything")} (${osModifier}K)`}</Input>

            <Flex alignItems="center">
                <Button variant="link" mr={6}>
                    About
                </Button>

                <Button mr={6} onClick={shareOnOpen}>
                    Share <Icon as={FaShareSquare} ml={2} />
                </Button>
                <Modal isOpen={shareIsOpen} onClose={shareOnClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize="2xl">Share</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack width="100%" fontWeight={500}>
                                <Flex
                                    width="100%"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mb={6}
                                >
                                    <FormControl as="span">
                                        <Text
                                            as="span"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Icon as={FaShareSquare} mr={2} />{" "}
                                            Share read-only
                                        </Text>
                                        <Input
                                            value="https://sqrl.uoft.in/timetable/507f1f77bcf86cd799439011"
                                            my={1}
                                            mt={2}
                                            readOnly
                                        />
                                        <FormHelperText fontWeight={400}>
                                            Anyone who views this timetable can
                                            duplicate it.
                                        </FormHelperText>
                                    </FormControl>
                                </Flex>
                                <ShareCalendar />
                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                // mr={4}
                                onClick={shareOnClose}
                            >
                                Close
                            </Button>
                            {/* <Button variant="ghost">Secondary Action</Button> */}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Button
                    variant="link"
                    onClick={onOpen}
                    outline="none"
                    border="none"
                    m={0}
                    mr={6}
                    // position="relative"
                    // top="0.2rem"
                    _hover={{
                        transform: "rotate(90deg)",
                    }}
                    _focus={{
                        border: "none",
                        outline: "none",
                    }}
                >
                    <SettingsIcon w={7} h={7} />
                </Button>
            </Flex>
            <PreferencesDrawer
                disclosure={{ isOpen, onOpen, onClose }}
                drawerProps={{
                    isOpen,
                    placement: "right",
                    onClose,
                }}
            />
        </HeaderComponent>
    )
}

export default Header
