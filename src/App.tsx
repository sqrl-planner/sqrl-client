import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import * as React from "react"
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
    colors: {
        pinkish: {
            50: "#ffc7c7",
        },
        gray: {
            75: "#fafafa",
            50: "#F7FAFC",
            650: "#424b5c",
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
