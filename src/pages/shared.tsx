import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import {
  pageLayout,
  Title,
} from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const Shared: NextPageWithLayout = () => {
  const { t } = useTranslation("fyp")

  return <Title>{t("dashboard:shared-with-me")}</Title>
}

Shared.getLayout = pageLayout

export default Shared

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
      // Will be passed to the page component as props
    },
  }
}
