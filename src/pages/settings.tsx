import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import {
  pageLayout,
  Title,
} from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const Settings: NextPageWithLayout = () => {
  const { t } = useTranslation("settings")

  return <Title>{t("dashboard:settings")}</Title>
}

Settings.getLayout = pageLayout

export default Settings

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
      // Will be passed to the page component as props
    },
  }
}
