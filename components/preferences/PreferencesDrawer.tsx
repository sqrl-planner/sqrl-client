import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Tab as ChakraTab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  UseDisclosureProps,
} from "@chakra-ui/react"
import React from "react"
import { usePreferences } from "../../src/PreferencesContext"
import PreferencesTimetable from "./PreferencesTimetable"
import PreferencesMeeting from "./PreferencesMeeting"
import PreferencesApplication from "./PreferencesApplication"
import { useTranslation } from "next-i18next"

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
  drawerProps: Omit<DrawerProps, "children">
}) => {
  const {
    state: { currentPrefTab },
  } = usePreferences()
  const { t } = useTranslation("preferences")
  return (
    <Drawer {...props.drawerProps} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerHeader fontSize="3xl" fontWeight="700" height="4.5rem">
          {t("preferences")}
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
              <Tab>{t("application")}</Tab>
              <Tab>{t("timetable")}</Tab>
              <Tab>{t("meeting")}</Tab>
            </TabList>
            <TabPanels position="relative" top="10" zIndex="0">
              <TabPanel>
                <PreferencesApplication />
              </TabPanel>
              <TabPanel>
                <PreferencesTimetable />
              </TabPanel>
              <TabPanel>
                <PreferencesMeeting />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PreferencesDrawer
