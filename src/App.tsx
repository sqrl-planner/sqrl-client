import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import * as React from "react"
import "./global.css"
import { PreferencesProvider } from "./PreferencesContext"
import Sqrl from "./Sqrl"
import { AppContextProvider } from "./SqrlContext"

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === "production"
            ? "https://api.uoft.in/graphql"
            : "http://localhost:5000/graphql",
})

// https://dev.to/tmaximini/accessing-authorization-headers-in-apollo-graphql-client-3b50
const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

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
            <AppContextProvider>
                <ApolloProvider client={client}>
                    <Sqrl />
                </ApolloProvider>
            </AppContextProvider>
        </PreferencesProvider>
    </ChakraProvider>
)
