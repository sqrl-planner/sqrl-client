import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { pageLayout, Title } from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const Feedback: NextPageWithLayout = () => {
  const { t } = useTranslation("fyp")

  return <Title>{t("dashboard:feedback")}</Title>
}
Feedback.getLayout = pageLayout

export default Feedback

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "feedback",
      ])),
      // Will be passed to the page component as props
    },
  }
}
