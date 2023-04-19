import React from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { Caption } from "@/components/common"
import { pageLayout, Title } from "@/components/dashboard"
import Heading from "@/components/terms/heading"

import { NextPageWithLayout } from "./_app"

const Terms: NextPageWithLayout = () => {
  const { t } = useTranslation("fyp")

  return (
    <>
      <Title>{t("dashboard:terms")}</Title>
      <Caption>Last updated 2023-04-18</Caption>
      <div className="eng-font flex flex-col gap-4 opacity-70">
        <Heading>Introduction and Acceptance of Terms</Heading>
        Welcome to Sqrl Planner, a timetable planner and builder designed for
        students at the University of Toronto. By using the Sqrl Planner web
        app, you agree to be bound by these terms of use (&ldquo;Terms&rdquo;).
        If you do not agree to these Terms, please do not use Sqrl Planner.
        <Heading>Eligibility and Access</Heading>
        Sqrl Planner is primarily targeted and useful for students at the
        University of Toronto, but other users may access it as well. You must
        be at least 13 years old to use Sqrl Planner.
        <Heading>Account Registration and Use of Sqrl ID</Heading>
        To use Sqrl Planner, you are required to log in with your UTORid via
        Microsoft OIDC through a separate service called Sqrl ID. Please refer
        to the Sqrl ID privacy policy (https://accounts.sqrl.sh/privacy) for
        information on how your data is handled.
        <Heading>Permitted and Prohibited Uses</Heading>
        You may use Sqrl Planner for personal, non-commercial purposes only. You
        may not use Sqrl Planner for any unlawful purposes, or in any manner
        that violates these Terms.
        <Heading>User-Generated Content</Heading>
        <div className="ml-10 flex flex-col gap-4">
          <Heading>a. Ratings</Heading>
          Users can rate courses with a thumbs up or down. You agree not to
          manipulate or misuse the rating system.
          <Heading>b. Timetable Names</Heading>
          Users can rename their timetables. You agree not to use offensive,
          inappropriate, or copyrighted names for your timetables.
        </div>
        <Heading>Third-Party Services and Content</Heading>
        Sqrl Planner currently does not include any third-party integrations or
        services.
        <Heading>Privacy Policy</Heading>
        Please review the separate privacy policy to understand how Sqrl Planner
        collects, uses, and shares your information.
        <Heading>Disclaimer of Warranties and Limitation of Liability</Heading>
        Sqrl Planner is provided &ldquo;as-is&rdquo; without any warranties,
        express or implied. The University of Toronto Timetable Builder
        (https://ttb.utoronto.ca/) should be considered the final authority on
        all timetable information. In no event shall Sqrl Planner be liable for
        any damages resulting from your use of or inability to use the app.
        <Heading>Feedback and Complaints</Heading>
        Users can provide feedback or report issues with Sqrl Planner. We are
        not obligated to act on or respond to any feedback or complaints but may
        choose to do so at our discretion.
        <Heading>Governing Law and Dispute Resolution</Heading>
        These Terms are governed by the laws of the Province of Ontario, Canada,
        without regard to its conflict of laws principles. Any disputes arising
        from these Terms or your use of Sqrl Planner shall be resolved through
        negotiation, mediation, or arbitration, as agreed upon by the parties.
        <Heading>Updates to the Terms of Use</Heading>
        We may update these Terms from time to time. We will notify you of any
        changes by posting the updated Terms on this page. Your continued use of
        Sqrl Planner after any updates constitutes your acceptance of the
        revised Terms.
        <Heading>Contact Information</Heading>
        If you have any questions about these Terms or your use of Sqrl Planner,
        please contact us at admin@approximant.io. By using Sqrl Planner, you
        acknowledge that you have read and understood these terms of use and
        agree to be bound by them. If you do not agree to these terms, please
        discontinue your use of Sqrl Planner immediately.
        <p>
          SQRL PLANNER IS PROVIDED &ldquo;AS IS&rdquo; AND WITHOUT WARRANTY OF
          ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
          WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          TITLE, NON-INFRINGEMENT, AND THOSE ARISING FROM COURSE OF DEALING OR
          USAGE OF TRADE. SQRL PLANNER DOES NOT WARRANT THAT THE APPLICATION
          WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. YOU ASSUME
          ALL RISK ASSOCIATED WITH THE USE OF SQRL PLANNER AND AGREE THAT THE
          DEVELOPER SHALL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND RELATED TO
          YOUR USE OF OR INABILITY TO USE THE APPLICATION.
        </p>
      </div>
    </>
  )
}

Terms.getLayout = pageLayout

export default Terms

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
      // Will be passed to the page component as props
    },
  }
}
