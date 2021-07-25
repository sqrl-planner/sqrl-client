import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react"
import * as React from "react"
import { createContext } from "react"
import Header from "./components/Header"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import "./global.css"
import { PreferencesProvider } from "./PreferencesContext"

const theme = extendTheme({
    fonts: {
        heading: "museo-sans, sans-serif",
        body: "museo-sans, sans-serif",
        mono: "interstate-mono, monospace",
    },
})
export default theme

export const App = () => (
    <ChakraProvider theme={theme}>
        <PreferencesProvider>
            {/* <Box textAlign="center" fontSize="xl"> */}
            {/* <Grid minH="100vh" p={3}> */}
            {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
            <Header />
            <Timetable meetings={EXAMPLE_MEETINGS} />
        </PreferencesProvider>
        {/* </Grid> */}
        {/* </Box> */}
    </ChakraProvider>
)
