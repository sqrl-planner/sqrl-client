import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ContentLayout, DashboardLayout, Title } from "@/components/dashboard"

const Courses = () => {
  const { t } = useTranslation("courses")

  return (
    <DashboardLayout>
      <ContentLayout>
        <Title>{t("dashboard:courses")}</Title>
      </ContentLayout>
    </DashboardLayout>
  )
}

export default Courses

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "courses",
      ])),
      // Will be passed to the page component as props
    },
  }
}
