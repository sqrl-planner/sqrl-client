import {
  Box,
  Tab as ChakraTab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useAppContext } from "../../src/SqrlContext"
import useCourses from "../../src/useCourses"
import useSections from "../../src/useSections"
import useTimetable from "../../src/useTimetable"
import { meetingsMissing } from "../../src/utils/course"
import CourseView from "./CourseView"
import OverviewView from "./OverviewView"
import SearchView from "./SearchView/SearchView"

const Tab = ({
  children,
  ...props
}: { children: React.ReactNode } & TabProps) => (
  <ChakraTab
    _active={{
      boxShadow: "outline",
    }}
    fontWeight="500"
    {...props}
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

const Sidebar = () => {
  const boxBackground = useColorModeValue("gray.75", "gray.700")
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()

  const { allowedToEdit } = useTimetable({
    id: router.query.id as string | undefined,
  })

  const {
    state: { sidebar, sidebarCourse },
    dispatch,
  } = useAppContext()

  const { sections } = useSections()
  const { courses, userMeetings } = useCourses({
    sections,
  })

  const toast = useToast()

  const { t } = useTranslation("sidebar")

  return (
    <Box
      width="25rem"
      minHeight="calc(100vh - 4.5rem)"
      background={boxBackground}
      position="relative"
      zIndex="0"
      pb={10}
    >
      <Tabs
        colorScheme="blue"
        isLazy
        isFitted
        m={0}
        mt={-5}
        p={0}
        pt={0}
        index={sidebar}
        onChange={(index) => {
          dispatch({ type: "SET_SIDEBAR", payload: index })

          if (index === 1) return

          const course = courses[sidebarCourse]

          if (
            !userMeetings ||
            !sidebarCourse ||
            !userMeetings[sidebarCourse] ||
            !course ||
            !toast
          )
            return

          const missing = meetingsMissing(course, userMeetings, sidebarCourse)

          if (missing.length == 0) return toast.close("warn-missing-section")

          if (toast.isActive("warn-missing-section")) return

          toast({
            id: "warn-missing-section",
            title: "Some courses are missing a section.",
            description: "Check Overview to see missing meetings.",
            status: "warning",
            variant: "solid",
            isClosable: true,
            duration: null,
          })
        }}
      >
        <TabList
          fontWeight={600}
          position="fixed"
          zIndex="1"
          p={1}
          pb={0}
          width="25rem"
          bg={useColorModeValue("gray.75", "gray.700")}
          height="2.8rem"
          boxShadow="0px 4px 6px -5px rgba(0,0,0,0.1)"
        >
          <Tab isDisabled={!allowedToEdit}>{t("search")}</Tab>
          <Tab>{t("course")}</Tab>
          <Tab>{t("overview")}</Tab>
        </TabList>
        <TabPanels
          position="relative"
          m={0}
          p={0}
          mt={5}
          pb={5}
          top="10"
          zIndex="0"
        >
          <TabPanel p={0}>
            <SearchView
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabPanel>
          <TabPanel p={0}>
            <CourseView setSearchQuery={setSearchQuery} />
          </TabPanel>
          <TabPanel p={0}>
            <OverviewView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Sidebar
