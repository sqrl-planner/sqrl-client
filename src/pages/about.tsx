import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { pageLayout, Title } from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"
import { useTranslation } from "next-i18next"

const About: NextPageWithLayout = () => {
  const { t } = useTranslation("about")
  return <Title>{t("dashboard:about")}</Title>
}

About.getLayout = pageLayout

export default About

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
      // Will be passed to the page component as props
    },
  }
}
