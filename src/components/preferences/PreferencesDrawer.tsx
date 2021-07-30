import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    Tab as ChakraTab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
    useColorModeValue,
    UseDisclosureProps,
    useToast,
} from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import PreferencesSection from "./PreferencesSection"
import PreferencesCosmetic from "./PreferencesCosmetic"
import PreferencesApplication from "./PreferencesApplication"

const IconWrapper = styled.div`
    padding-right: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Tab = ({ children }: { children: React.ReactNode }) => (
    <ChakraTab
        _focus={{
            boxShadow: "none",
        }}
        _active={{
            background: "inherit",
        }}
        fontWeight={500}
    >
        {children}
    </ChakraTab>
)

const PreferencesDrawer = (props: {
    disclosure: UseDisclosureProps
    drawerprops: any
}) => {
    // const { isOpen, onOpen, onClose } = props.disclosure
    // const firstField = useRef() as React.MutableRefObject<HTMLInputElement>

    const {
        state: {
            scale,
            start,
            end,
            showTimeInMeeting,
            showCourseSuffix,
            palette,
            highlightConflicts,
            twentyFour,
        },
        dispatch,
    } = usePreferences()

    const { colorMode, toggleColorMode } = useColorMode()

    const toast = useToast()

    return (
        <Drawer {...props.drawerprops} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton size="lg" />
                <DrawerHeader
                    // background="gray.100"
                    fontSize="3xl"
                    fontWeight="700"
                    height="4.5rem"
                    // zIndex="100"
                >
                    Preferences
                </DrawerHeader>

                <DrawerBody p={0} userSelect="none">
                    <Tabs colorScheme="blue">
                        <TabList
                            position="fixed"
                            zIndex="1"
                            width="100%"
                            bg={useColorModeValue("white", "gray.700")}
                            px={2}
                            height="2.8rem"
                            boxShadow="0px 4px 6px -4px rgba(0,0,0,0.1)"
                        >
                            <Tab>Appearance</Tab>
                            <Tab>Application</Tab>
                        </TabList>
                        <TabPanels position="relative" top="10" zIndex="0">
                            <TabPanel>
                                <PreferencesCosmetic />
                            </TabPanel>
                            <TabPanel>
                                <PreferencesApplication />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
                {/* 
                <DrawerFooter
                    boxShadow="1px -1px 6px -4px rgba(0,0,0,0.5)"
                    // borderTopWidth="1px"
                >
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer
