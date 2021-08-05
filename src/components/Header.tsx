import { SettingsIcon } from "@chakra-ui/icons"
import {
    Button,
    chakra,
    Heading,
    Input,
    Link,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"
import React, { MutableRefObject, useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import PreferencesDrawer from "./preferences/PreferencesDrawer"

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

const Header = () => {
    const searchRef = useRef() as MutableRefObject<HTMLInputElement>

    const keydownListener = useCallback((e) => {
        if (!searchRef.current) return
        if (e.repeat) return

        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault()

            searchRef.current.focus()
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", keydownListener, true)
        return () =>
            window.removeEventListener("keydown", keydownListener, true)
    }, [keydownListener])

    let osModifier: string = ""

    if (navigator.userAgent.indexOf("Mac OS X") !== -1) osModifier = "⌘"
    if (navigator.userAgent.indexOf("Windows") !== -1) osModifier = "Ctrl + "

    const { isOpen, onOpen, onClose } = useDisclosure()
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
                boxShadow="1px 1px 8px -5px rgba(0, 0, 0, 0.4)"
                placeholder={`Search for a course (${osModifier}K)`}
                ref={searchRef}
                position="absolute"
                width="40%"
                maxWidth="400px"
                top="0"
                right="0"
                bottom="0"
                left="0"
                margin="auto"
            />

            <div>
                <Button
                    variant="link"
                    onClick={onOpen}
                    outline="none"
                    border="none"
                    m={0}
                    mx={6}
                    position="relative"
                    top="0.2rem"
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
            </div>
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
