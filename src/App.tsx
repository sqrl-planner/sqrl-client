import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react"
import * as React from "react"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import "./global.css"

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
        {/* <Box textAlign="center" fontSize="xl"> */}
        {/* <Grid minH="100vh" p={3}> */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Heading m={6} as="h1" size="3xl">
            Sqrl
        </Heading>
        <Timetable meetings={EXAMPLE_MEETINGS} />
        {/* </Grid> */}
        {/* </Box> */}
    </ChakraProvider>
)
