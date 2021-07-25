import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react"
import * as React from "react"
import { createContext } from "react"
import Header from "./components/Header"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import "./global.css"
import { PreferencesProvider } from "./PreferencesContext"
import Sqrl from "./Sqrl"

const theme = extendTheme({
    fonts: {
        // heading: "museo-sans, sans-serif",
        // body: "museo-sans, sans-serif",
        body: "Inter, sans-serif",
        heading: "Inter, sans-serif",
        mono: "interstate-mono, monospace",
    },
    components: {
        FormLabel: {
            baseStyle: {
                fontWeight: 600,
            },
        },
    },
})
export default theme

export const App = () => (
    <ChakraProvider theme={theme}>
        <PreferencesProvider>
            <Sqrl />
        </PreferencesProvider>
    </ChakraProvider>
)
