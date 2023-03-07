import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import {
  pageLayout,
  Title,
} from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const Courses: NextPageWithLayout = () => {
  const { t } = useTranslation("courses")

  return <Title>{t("dashboard:courses")}</Title>
}

Courses.getLayout = pageLayout

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
