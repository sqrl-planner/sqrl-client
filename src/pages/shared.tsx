import { ContentLayout, DashboardLayout } from "@/components/dashboard"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const About = () => {
  const { t } = useTranslation("fyp")

  return (
    <DashboardLayout>
      <ContentLayout>
        <h1 className="text-7xl font-serif">{t("shared")}</h1>
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
