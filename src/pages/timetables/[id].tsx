import React from "react"
import { NextPageWithLayout } from "@/pages/_app"
import { Header } from "@/components/dashboard"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { headerPageLayout } from "@/components/common/headerLayout"
import { log } from "console"

const TimetablePage: NextPageWithLayout = () => {
  const { t } = useTranslation("courses")

  return (
    <div className="relative flex w-full flex-col pt-14 lg:flex-row">
      moornin
    </div>
  )
}

TimetablePage.getLayout = headerPageLayout

export default TimetablePage

type ServerSidePropsProps = {
  locale: string
  query: {
    id: string
  }
}

export const getServerSideProps = async ({
  locale,
  query,
}: ServerSidePropsProps) => {
  log(query)
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
