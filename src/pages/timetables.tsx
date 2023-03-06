import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import {
  ContentLayout,
  DashboardLayout,
  Timetables,
} from "@/components/dashboard"

export default function Home() {
  const { t } = useTranslation("timetables")

  return (
    <>
      <Head>
        <title>{t("dashboard:timetables")}</title>
      </Head>
      <DashboardLayout>
        <ContentLayout>
          <Timetables />
        </ContentLayout>
      </DashboardLayout>
    </>
  )
}

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
