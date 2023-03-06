import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ContentLayout, DashboardLayout, Title } from "@/components/dashboard"

const About = () => {
  return (
    <DashboardLayout>
      <ContentLayout>
        <Title>About</Title>
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
