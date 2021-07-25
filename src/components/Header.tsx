import { SettingsIcon } from "@chakra-ui/icons"
import {
    Button,
    Heading,
    Input,
    useDisclosure,
    useToast,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import PreferencesDrawer from "./PreferencesDrawer"

const HeaderComponent = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100vw;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0px 1px 8px -5px rgba(0, 0, 0, 0.4);
`

const Program = styled.div`
    &::before {
        content: "program of study";
        position: absolute;
        font-variant: small-caps;
        font-size: 0.8em;
        font-weight: 800;
        color: #555;
        top: -1.2em;
    }
    position: relative;
    top: 0.4rem;
`

const Header = () => {
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const keydownListener = useCallback((keydownEvent) => {
        const { key, metaKey, ctrlKey, target, repeat } = keydownEvent
        if (repeat) return

        if ((metaKey || ctrlKey) && key === "k") {
            keydownEvent.preventDefault()
            searchRef.current.focus()
        }

        // if (blacklistedTargets.includes(target.tagName)) return
        // if (!shortcutKeys.includes(key)) return

        // if (!keys[key]) setKeys({ type: "set-key-down", key })
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", keydownListener, true)
        console.log(navigator.userAgent)
        return () =>
            window.removeEventListener("keydown", keydownListener, true)
    }, [keydownListener])

    let osModifier: string = ""

    if (navigator.userAgent.indexOf("Mac OS X") !== -1) osModifier = "⌘"
    if (navigator.userAgent.indexOf("Windows") !== -1) osModifier = "Ctrl + "

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <HeaderComponent>
            <Heading
                m={4}
                ml={6}
                as="h1"
                size="xl"
                _before={{
                    content: '"for U of T"',
                    fontSize: "0.7rem",
                    width: "100%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    position: "absolute",
                    bottom: "-0.8rem",
                    whiteSpace: "nowrap",
                    color: "#555",
                }}
                position="relative"
                bottom="0.5rem"
            >
                Sqrl
            </Heading>
            <Program>
                Fine arts specialist + Poker dealing major + Air Rifle minor
            </Program>
            <Input
                width="40%"
                boxShadow="1px 1px 8px -6px rgba(0, 0, 0, 0.4)"
                autoFocus
                ml={6}
                mr={6}
                placeholder={`Search for a course (${osModifier}K)`}
                ref={searchRef}
            />
            <div>
                <Button
                    colorScheme="blue"
                    variant="link"
                    onClick={onOpen}
                    outline="none"
                    mr={4}
                >
                    <SettingsIcon w={6} h={6} />
                </Button>
            </div>
            <PreferencesDrawer
                disclosure={{ isOpen, onOpen, onClose }}
                drawerprops={{
                    isOpen,
                    placement: "right",
                    onClose,
                }}
            />
        </HeaderComponent>
    )
}

export default Header
