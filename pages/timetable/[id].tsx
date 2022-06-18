import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React, { useState } from "react"
import { GET_TIMETABLE_BY_ID } from "../../operations/queries/getTimetableById"
import { SEARCH_COURSES } from "../../operations/queries/searchCourses"
import client, { apolloClientParams } from "../../src/apollo-client"
import { PreferencesProvider } from "../../src/PreferencesContext"
import Sqrl from "../../src/Sqrl"
import { AppContextProvider } from "../../src/SqrlContext"
import { SectionsProvider } from "../../src/useSections"

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

export const TimetableView: NextPage = (props: any) => {
  const sharePrefix = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}/timetable/` : ""

  console.log(props);
  

  return (
    <React.Fragment>
      <Head>
        <title>Sqrl Planner | {props.name}</title>
        <meta
          property="og:url"
          content={`${sharePrefix}${props.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Sqrl Planner | ${props.name}`} />
      </Head>
      <ChakraProvider theme={theme}>
        <PreferencesProvider>
          <ApolloProvider client={client}>
            <AppContextProvider>
              <SectionsProvider>
                <Sqrl />
              </SectionsProvider>
            </AppContextProvider>
          </ApolloProvider>
        </PreferencesProvider>
      </ChakraProvider>
    </React.Fragment>
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
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache"
      }
    }
  })

  try {
    const { data } = await serverSideApolloClient.query({
      query: GET_TIMETABLE_BY_ID,
      variables: {
        id,
      },
    })

    console.log(data);
    

    return {
      props: {
        ...translationProps,
        sections: JSON.parse(data.timetableById.sections),
        name: data.timetableById.name,
        id
      },
    }
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}

export default TimetableView
