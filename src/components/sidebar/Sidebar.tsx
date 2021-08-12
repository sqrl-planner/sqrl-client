import {
    Box,
    Tab as ChakraTab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../SqrlContext"
import PreferencesApplication from "../preferences/PreferencesApplication"
import PreferencesMeeting from "../preferences/PreferencesMeeting"
import PreferencesTimetable from "../preferences/PreferencesTimetable"
import CourseView from "./CourseView"
import SearchView from "./SearchView"

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

const Sidebar = () => {
    const boxBackground = useColorModeValue("gray.75", "gray.700")
    const [searchQuery, setSearchQuery] = useState("")

    const {
        state: { sidebar },
        dispatch,
    } = useAppContext()

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
                }}
            >
                <TabList
                    fontWeight={600}
                    position="fixed"
                    zIndex="1"
                    width="25rem"
                    bg={useColorModeValue("white", "gray.700")}
                    // px={6}

                    height="2.8rem"
                    boxShadow="0px 4px 6px -4px rgba(0,0,0,0.1)"
                >
                    <Tab>Search</Tab>
                    <Tab>Course</Tab>
                    <Tab>Overview</Tab>
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
                    <TabPanel p={0}></TabPanel>
                </TabPanels>
            </Tabs>
            {/* {sidebar === "course" ? <CourseView /> : "nut"} */}
        </Box>
    )
}

export default Sidebar
