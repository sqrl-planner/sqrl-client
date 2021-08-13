import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import React from "react"
import client from "../apollo-client"
import { AppContextProvider } from "../SqrlContext"
import { PreferencesProvider } from "../PreferencesContext"
import { ApolloProvider } from "@apollo/client"
import { appWithTranslation } from "next-i18next"

export const theme = extendTheme({
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

function Application({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <PreferencesProvider>
                <AppContextProvider>
                    <ApolloProvider client={client}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </AppContextProvider>
            </PreferencesProvider>
        </ChakraProvider>
    )
}
export default appWithTranslation(Application)
