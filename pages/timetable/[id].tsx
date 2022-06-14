import { ApolloClient, ApolloProvider } from "@apollo/client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import { GET_TIMETABLE_BY_ID } from "../../operations/queries/getTimetableById"
import { SEARCH_COURSES } from "../../operations/queries/searchCourses"
import client, { apolloClientParams } from "../../src/apollo-client"
import { PreferencesProvider } from "../../src/PreferencesContext"
import Sqrl from "../../src/Sqrl"
import { AppContextProvider } from "../../src/SqrlContext"

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

export const Home: NextPage = (props: any) => {
  return (
    <ChakraProvider theme={theme}>
      <PreferencesProvider>
        <ApolloProvider client={client}>
          <AppContextProvider sections={props.sections}>
            <Sqrl sections={props.sections} />
          </AppContextProvider>
        </ApolloProvider>
      </PreferencesProvider>
    </ChakraProvider>
  )
}

export async function getServerSideProps({
  locale,
  query,
}: {
  locale: string
  query: any
}) {
  const translationProps = {
    ...(await serverSideTranslations(locale, [
      "common",
      "sidebar",
      "preferences",
    ])),
  }

  const id = query.id

  const serverSideApolloClient = new ApolloClient({
    ssrMode: true,
    ...apolloClientParams,
  })

  try {
    const { data } = await serverSideApolloClient.query({
      query: GET_TIMETABLE_BY_ID,
      variables: {
        id,
      },
    })

    return {
      props: {
        ...translationProps,
        sections: JSON.parse(data.timetableById.sections)
      },
    }
  } catch (e) {
    console.log("error"+e);
    
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}

export default Home
