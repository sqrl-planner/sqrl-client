import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Tab as ChakraTab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
    UseDisclosureProps,
} from "@chakra-ui/react"
import React from "react"
import { usePreferences } from "../../PreferencesContext"
import PreferencesApplication from "./PreferencesApplication"
import PreferencesCosmetic from "./PreferencesCosmetic"

const Tab = ({ children }: { children: React.ReactNode }) => (
    <ChakraTab
        _active={{
            boxShadow: "outline",
        }}
        fontWeight="500"
        _selected={{
            fontWeight: "600",
            color: "var(--chakra-colors-blue-600)",
            borderColor: "currentColor",
        }}
    >
        {children}
    </ChakraTab>
)

const PreferencesDrawer = (props: {
    disclosure: UseDisclosureProps
    drawerProps: any
}) => {
    const {
        state: { currentPrefTab },
    } = usePreferences()
    return (
        <Drawer {...props.drawerProps} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton size="lg" />
                <DrawerHeader fontSize="3xl" fontWeight="700" height="4.5rem">
                    Preferences
                </DrawerHeader>

                <DrawerBody p={0} userSelect="none">
                    <Tabs
                        colorScheme="blue"
                        defaultIndex={currentPrefTab}
                        isLazy
                        isFitted
                    >
                        <TabList
                            position="fixed"
                            zIndex="1"
                            width="100%"
                            bg={useColorModeValue("white", "gray.700")}
                            px={6}
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
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer
