import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { pageLayout, Title } from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const ForYou: NextPageWithLayout = () => {
  const { t } = useTranslation("fyp")

  return <Title>{t("dashboard:for-you")}</Title>
}

ForYou.getLayout = pageLayout

export default ForYou

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard", "fyp"])),
      // Will be passed to the page component as props
    },
  }
}
