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
import PreferencesTimetable from "./PreferencesTimetable"
import PreferencesCosmetic from "./PreferencesCosmetic"
import PreferencesApplication from "./PreferencesApplication"

const Tab = ({ children }: { children: React.ReactNode }) => (
    <ChakraTab
        _active={{
            boxShadow: "outline",
        }}
        fontWeight="500"
        _selected={{
            fontWeight: "600",
            color: `${useColorModeValue(
                "var(--chakra-colors-blue-600)",
                "var(--chakra-colors-blue-300)"
            )}`,
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
                            <Tab>Application</Tab>
                            <Tab>Timetable</Tab>
                            <Tab>Appearance</Tab>
                        </TabList>
                        <TabPanels position="relative" top="10" zIndex="0">
                            <TabPanel>
                                <PreferencesApplication />
                            </TabPanel>
                            <TabPanel>
                                <PreferencesTimetable />
                            </TabPanel>
                            <TabPanel>
                                <PreferencesCosmetic />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer
