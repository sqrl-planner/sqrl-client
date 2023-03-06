import { ContentLayout, DashboardLayout } from "@/components/dashboard"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const Courses = () => {
  const { t } = useTranslation("courses")

  return (
    <DashboardLayout>
      <ContentLayout>
        <h1 className="text-7xl font-serif">{t("dashboard:courses")}</h1>
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
