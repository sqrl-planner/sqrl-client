import { ApolloClient, InMemoryCache } from "@apollo/client"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import Layout from "../../components/Layout"
import TitleMeta from "../../components/TitleMeta"
import { GET_TIMETABLE_BY_ID } from "../../operations/queries/getTimetableById"
import { apolloClientParams } from "../../src/apollo-client"
import { PreferencesProvider } from "../../src/PreferencesContext"
import Sqrl from "../../src/Sqrl"
import { AppContextProvider } from "../../src/SqrlContext"
import { SectionsProvider } from "../../src/useSections"
import useSharePrefix from "../../src/useSharePrefix"

export const TimetableView: NextPage = (props: any) => {
  const [sharePrefix] = useSharePrefix()

  return (
    <React.Fragment>
      <TitleMeta name={props.name} id={props.id} sharePrefix={sharePrefix} />
      <PreferencesProvider>
        <AppContextProvider>
          <SectionsProvider initialSections={props.sections}>
            <Layout>
              <Sqrl />
            </Layout>
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
