import { DashboardLayout } from "@/components/dashboard"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const About = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-7xl font-serif">About</h1>
      </div>
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
