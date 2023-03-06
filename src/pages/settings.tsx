import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ContentLayout, DashboardLayout, Title } from "@/components/dashboard"

const About = () => {
  const { t } = useTranslation("settings")

  return (
    <DashboardLayout>
      <ContentLayout>
        <Title>{t("dashboard:settings")}</Title>
      </ContentLayout>
    </DashboardLayout>
  )
}

export default About

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
      // Will be passed to the page component as props
    },
  }
}
