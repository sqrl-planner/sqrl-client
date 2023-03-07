import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import {
  pageLayout,
  Timetables,
} from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const TimetablesPage: NextPageWithLayout = () => {
  const { t } = useTranslation("timetables")

  return (
    <>
      <Head>
        <title>{t("dashboard:timetables")}</title>
      </Head>
      <Timetables />
    </>
  )
}

TimetablesPage.getLayout = pageLayout

export default TimetablesPage

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "timetables",
      ])),
      // Will be passed to the page component as props
    },
  }
}
