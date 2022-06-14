import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import client from "../src/apollo-client"
import { PreferencesProvider } from "../src/PreferencesContext"
import Sqrl from "../src/Sqrl"
import { AppContextProvider } from "../src/SqrlContext"

export const theme = extendTheme({
  fonts: {
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
    blue: {
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      // 700: '#0e7490',
      700: "rgb(59, 144, 173)",
      800: "#155e75",
      900: "#164e63",
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

export const Home: NextPage = () => {
  return (
    <ChakraProvider theme={theme}>
      yee
      {/* <PreferencesProvider> */}
      {/*   <AppContextProvider> */}
      {/*     <ApolloProvider client={client}> */}
      {/*       <Sqrl /> */}
      {/*     </ApolloProvider> */}
      {/*   </AppContextProvider> */}
      {/* </PreferencesProvider> */}
    </ChakraProvider>
  )
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "sidebar",
        "preferences",
      ])),
    },
  }
}

export default Home
