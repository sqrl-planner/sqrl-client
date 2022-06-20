import { ApolloClient, InMemoryCache } from "@apollo/client"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { GET_TIMETABLE_BY_ID } from "../../operations/queries/getTimetableById"
import { apolloClientParams } from "../../src/apollo-client"
import { PreferencesProvider } from "../../src/PreferencesContext"
import Sqrl from "../../src/Sqrl"
import { AppContextProvider } from "../../src/SqrlContext"
import { SectionsProvider } from "../../src/useSections"

export const TimetableView: NextPage = (props: any) => {
  const [sharePrefix, setSharePrefix] = useState("")

  useEffect(() => {
    setSharePrefix(
      `${window.location.protocol}//${window.location.host}/timetable/`
    )
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Sqrl Planner | {props.name}</title>
        <meta property="og:url" content={`${sharePrefix}${props.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Sqrl Planner | ${props.name}`} />
      </Head>
      <PreferencesProvider>
        <AppContextProvider>
          <SectionsProvider initialSections={props.sections}>
            <Sqrl />
          </SectionsProvider>
        </AppContextProvider>
      </PreferencesProvider>
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
      "modal",
      "index",
    ])),
  }

  const id = query.id

  const serverSideApolloClient = new ApolloClient({
    ssrMode: true,
    ...apolloClientParams,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
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
        sections: JSON.parse(data.timetableById.sections),
        name: data.timetableById.name,
        id,
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
