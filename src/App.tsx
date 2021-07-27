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
    styles: {
        global: {
            body: {
                // bg: ["gray.50", "gray.800"],
            },
        },
    },
    colors: {
        pinkish: {
            50: "#ffc7c7",
        },
        gray: {
            75: "#fafafa",
            50: "#F7FAFC",
        },
    },
    colorSchemes: {
        pinkish: "#ffc7c7",
    },
    components: {
        FormLabel: {
            baseStyle: {
                display: "flex",
                alignItems: "center",
                // fontWeight: 600,
            },
        },
        Switch: {
            defaultProps: {
                // colorScheme: "pink",
            },
        },
        Select: {
            defaultProps: {
                // border: "2px solid",
                // bg: "red.50",
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
