import React from "react"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { Anchor, Caption, Rule } from "@/components/common"
import {
  pageLayout,
  Title,
} from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const InShort = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white my-2 p-5 px-6 rounded-xl shadow-lg">
      {children}
    </div>
  )
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="mt-4">
        <Caption>{children}</Caption>
        <Rule />
      </h2>
    </>
  )
}

const Privacy: NextPageWithLayout = () => {
  const { t } = useTranslation("privacy")

  return (
    <>
      <Head>
        <title>{t("dashboard:privacy-policy")}</title>
      </Head>

      <Title>{t("dashboard:privacy-policy")}</Title>
      <Caption>Last updated 2023-03-05</Caption>
      <div className="text-xl flex flex-col gap-4 font-medium opacity-70">
        <div>
          This privacy notice for Sqrl Planner (&quot;<strong>we</strong>
          ,&quot; &quot;<strong>us</strong>,&quot; or &quot;
          <strong>our</strong>&quot;), describes how and why we might collect,
          store, use, and/or share (&quot;
          <strong>process</strong>&quot;) your information when you use our
          services (&quot;<strong>Services</strong>
          &quot;), such as when you:
        </div>
        <ul>
          <li>
            Visit our website at sqrlplanner.com, or any website of ours that
            links to this privacy notice
          </li>
          <li>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </li>
        </ul>
        <div>
          <strong>Questions or concerns?&nbsp;</strong>Reading this privacy
          notice will help you understand your privacy rights and choices. If
          you do not agree with our policies and practices, please do not use
          our Services. If you still have any questions or concerns, please
          contact us at admin@sqrlplanner.com.
        </div>

        <Heading>SUMMARY OF KEY POINTS</Heading>

        <div>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with Sqrl Planner and the
          Services, the choices you make, and the products and features you use.
        </div>
        <div>
          <strong>Do we process any sensitive personal information?</strong> We
          do not process sensitive personal information.
        </div>
        <div>
          <strong>Do we receive any information from third parties?</strong> We
          may receive information from public databases, marketing partners,
          social media platforms, and other outside sources.
        </div>
        <div>
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so.
        </div>
        <div>
          <strong>
            In what situations and with which types of parties do we share
            personal information?
          </strong>{" "}
          We may share information in specific situations and with specific
          categories of third parties.
        </div>
        <div>
          <strong>How do we keep your information safe?</strong> We have
          organizational and technical processes and procedures in place to
          protect your personal information. However, no electronic transmission
          over the internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information.
        </div>
        <div>
          <strong>What are your rights?</strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information.
        </div>
        <div>
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by filling out our data subject request form
          available{" "}
          <Anchor href="https://app.termly.io/notify/f8af9e72-0b31-4acf-8dc5-24d56be457ec">
            here
          </Anchor>
          , or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </div>
        <div>
          Want to learn more about what Sqrl Planner does with any information
          we collect? Click&nbsp;
          <Anchor href="#toc">here</Anchor>
          &nbsp;to review the notice in full.
        </div>

        <Heading>1. WHAT INFORMATION DO WE COLLECT?</Heading>

        <div>
          <strong>Personal information you disclose to us</strong>
        </div>
        <div>
          <InShort>
            <strong>In Short:</strong> We collect personal information that you
            provide to us.
          </InShort>
        </div>
        <div>
          We collect personal information that you voluntarily provide to us
          when you register on the Services,&nbsp;express an interest in
          obtaining information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </div>
        <div>
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </div>
        <ul>
          <li>names</li>
          <li>email addresses</li>
          <li>usernames</li>
          <li>passwords</li>
        </ul>
        <div>
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </div>
        <div>
          <strong>Social Media Login Data.&nbsp;</strong>We may provide you with
          the option to register with us using your existing social media
          account details, like your Facebook, Twitter, or other social media
          account. If you choose to register in this way, we will collect the
          information described in the section called &quot;HOW DO WE HANDLE
          YOUR SOCIAL LOGINS?&quot; below.
        </div>
        <div>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </div>
        <div>
          <strong>Information automatically collected</strong>
        </div>

        <InShort>
          <strong>In Short:</strong> Some information &mdash; such as your
          Internet Protocol (IP) address and/or browser and device
          characteristics &mdash; is collected automatically when you visit our
          Services.
        </InShort>

        <div>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </div>
        <div>
          Like many businesses, we also collect information through cookies and
          similar technologies.{" "}
        </div>
        <div>The information we collect includes:</div>
        <ul>
          <li>
            Log and Usage Data. Log and usage data is service-related,
            diagnostic, usage, and performance information our servers
            automatically collect when you access or use our Services and which
            we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser
            type, and settings and information about your activity in the
            Services&nbsp;(such as the date/time stamps associated with your
            usage, pages and files viewed, searches, and other actions you take
            such as which features you use), device event information (such as
            system activity, error reports (sometimes called &quot;crash
            dumps&quot;), and hardware settings).
          </li>
        </ul>
        <ul>
          <li>
            Device Data. We collect device data such as information about your
            computer, phone, tablet, or other device you use to access the
            Services. Depending on the device used, this device data may include
            information such as your IP address (or proxy server), device and
            application identification numbers, location, browser type, hardware
            model, Internet service provider and/or mobile carrier, operating
            system, and system configuration information.
          </li>
        </ul>
        <ul>
          <li>
            Location Data. We collect location data such as information about
            your device&apos;s location, which can be either precise or
            imprecise. How much information we collect depends on the type and
            settings of the device you use to access the Services. For example,
            we may use GPS and other technologies to collect geolocation data
            that tells us your current location (based on your IP address). You
            can opt out of allowing us to collect this information either by
            refusing access to the information or by disabling your Location
            setting on your device. However, if you choose to opt out, you may
            not be able to use certain aspects of the Services.
          </li>
        </ul>
        <div>
          <strong>Information collected from other sources</strong>
        </div>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          We may collect limited data from public databases, marketing partners,
          social media platforms, and other outside sources.
        </InShort>

        <div>
          In order to enhance our ability to provide relevant marketing, offers,
          and services to you and update our records, we may obtain information
          about you from other sources, such as public databases, joint
          marketing partners, affiliate programs, data providers, social media
          platforms,&nbsp;and from other third parties. This information
          includes mailing addresses, job titles, email addresses, phone
          numbers, intent data (or user behavior data), Internet Protocol (IP)
          addresses, social media profiles, social media URLs, and custom
          profiles, for purposes of targeted advertising and event
          promotion.&nbsp;If you interact with us on a social media platform
          using your social media account (e.g., Facebook or Twitter), we
          receive personal information about you such as your name, email
          address, and gender. Any personal information that we collect from
          your social media account depends on your social media account&apos;s
          privacy settings.
        </div>

        <Heading>2. HOW DO WE PROCESS YOUR INFORMATION?</Heading>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent.
        </InShort>

        <div>
          <strong>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </strong>
        </div>
        <ul>
          <li>
            <strong>
              To facilitate account creation and authentication and otherwise
              manage user accounts.&nbsp;
            </strong>
            We may process your information so you can create and log in to your
            account, as well as keep your account in working order.
          </li>
          <li>
            <strong>
              To deliver and facilitate delivery of services to the user.&nbsp;
            </strong>
            We may process your information to provide you with the requested
            service.
          </li>
          <li>
            <strong>To request feedback.&nbsp;</strong>We may process your
            information when necessary to request feedback and to contact you
            about your use of our Services.
          </li>
          <li>
            <strong>
              To send you marketing and promotional communications.&nbsp;
            </strong>
            We may process the personal information you send to us for our
            marketing purposes, if this is in accordance with your marketing
            preferences. You can opt out of our marketing emails at any time.
            For more information, see &quot;WHAT ARE YOUR PRIVACY RIGHTS?&quot;
            below.
          </li>
          <li>
            <strong>To protect our Services.</strong> We may process your
            information as part of our efforts to keep our Services safe and
            secure, including fraud monitoring and prevention.
          </li>
          <li>
            <strong>
              To evaluate and improve our Services, products, marketing, and
              your experience.
            </strong>{" "}
            We may process your information when we believe it is necessary to
            identify usage trends, determine the effectiveness of our
            promotional campaigns, and to evaluate and improve our Services,
            products, marketing, and your experience.
          </li>

          <li>
            <strong>To identify usage trends.</strong> We may process
            information about how you use our Services to better understand how
            they are being used so we can improve them.
          </li>
        </ul>

        <Heading>
          3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
        </Heading>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          We only process your personal information when we believe it is
          necessary and we have a valid legal reason (i.e., legal basis) to do
          so under applicable law, like with your consent, to comply with laws,
          to provide you with services to enter into or fulfill our contractual
          obligations, to protect your rights, or to fulfill our legitimate
          business interests.
        </InShort>
        <div>
          We may process your information if you have given us specific
          permission (i.e., express consent) to use your personal information
          for a specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can withdraw your consent at any
          time.{" "}
        </div>
        <div>
          In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
        </div>
        <ul>
          <li>
            If collection is clearly in the interests of an individual and
            consent cannot be obtained in a timely way
          </li>
          <li>For investigations and fraud detection and prevention</li>
          <li>For business transactions provided certain conditions are met</li>
          <li>
            If it is contained in a witness statement and the collection is
            necessary to assess, process, or settle an insurance claim
          </li>
          <li>
            For identifying injured, ill, or deceased persons and communicating
            with next of kin
          </li>
          <li>
            If we have reasonable grounds to believe an individual has been, is,
            or may be victim of financial abuse
          </li>
          <li>
            If it is reasonable to expect collection and use with consent would
            compromise the availability or the accuracy of the information and
            the collection is reasonable for purposes related to investigating a
            breach of an agreement or a contravention of the laws of Canada or a
            province
          </li>
          <li>
            If disclosure is required to comply with a subpoena, warrant, court
            order, or rules of the court relating to the production of records
          </li>
          <li>
            If it was produced by an individual in the course of their
            employment, business, or profession and the collection is consistent
            with the purposes for which the information was produced
          </li>
          <li>
            If the collection is solely for journalistic, artistic, or literary
            purposes
          </li>
          <li>
            If the information is publicly available and is specified by the
            regulations
          </li>
        </ul>

        <Heading>
          4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Heading>

        <InShort>
          <strong>In Short:</strong>
          &nbsp;We may share information in specific situations described in
          this section and/or with the following categories of third parties.
        </InShort>
        <div>
          <strong>
            Vendors, Consultants, and Other Third-Party Service Providers.
          </strong>{" "}
          We may share your data with third-party vendors, service providers,
          contractors, or agents (&quot;
          <strong>third parties</strong>
          &quot;) who perform services for us or on our behalf and require
          access to such information to do that work. We have contracts in place
          with our third parties, which are designed to help safeguard your
          personal information. This means that they cannot do anything with
          your personal information unless we have instructed them to do it.
          They will also not share your personal information with any
          organization apart from us. They also commit to protect the data they
          hold on our behalf and to retain it for the period we instruct. The
          categories of third parties we may share personal information with are
          as follows:
        </div>
        <ul>
          <li>Data Analytics Services</li>
          <li>Cloud Computing Services</li>
        </ul>

        <Heading>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</Heading>

        <InShort>
          <strong>In Short:</strong>
          &nbsp;We may use cookies and other tracking technologies to collect
          and store your information.
        </InShort>
        <div>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our Cookie Notice.
        </div>
        <Heading>6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Heading>
        <InShort>
          <strong>In Short:&nbsp;</strong>
          If you choose to register or log in to our Services using a social
          media account, we may have access to certain information about you.
        </InShort>
        <div>
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or
          Twitter logins). Where you choose to do this, we will receive certain
          profile information about you from your social media provider. The
          profile information we receive may vary depending on the social media
          provider concerned, but will often include your name, email address,
          friends list, and profile picture, as well as other information you
          choose to make public on such a social media platform.{" "}
        </div>
        <div>
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </div>

        <Heading>7. HOW LONG DO WE KEEP YOUR INFORMATION?</Heading>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this privacy notice unless otherwise required by
          law.
        </InShort>
        <div>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </div>
        <div>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </div>

        <Heading>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</Heading>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          We aim to protect your personal information through a system of
          organizational and technical security measures.
        </InShort>
        <div>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </div>

        <Heading>9. DO WE COLLECT INFORMATION FROM MINORS?</Heading>

        <InShort>
          <strong>In Short:</strong>
          &nbsp;We do not knowingly collect data from or market to children
          under 18 years of age.
        </InShort>
        <div>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent&rsquo;s use of the Services. If we
          learn that personal information from users less than 18 years of age
          has been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at admin@sqrlplanner.com.
        </div>

        <Heading>10. WHAT ARE YOUR PRIVACY RIGHTS?</Heading>

        <InShort>
          <strong>In Short:</strong>
          &nbsp;In some regions, such as Canada, you have rights that allow you
          greater access to and control over your personal information.&nbsp;You
          may review, change, or terminate your account at any time.
        </InShort>
        <div>
          In some regions (like Canada), you have certain rights under
          applicable data protection laws. These may include the right (i) to
          request access and obtain a copy of your personal information, (ii) to
          request rectification or erasure; (iii) to restrict the processing of
          your personal information; and (iv) if applicable, to data
          portability. In certain circumstances, you may also have the right to
          object to the processing of your personal information. You can make
          such a request by contacting us by using the contact details provided
          in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
          below.
        </div>
        <div>
          We will consider and act upon any request in accordance with
          applicable data protection laws.
        </div>
        <div>
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your local data protection supervisory authority. You can
          find their contact details here:{" "}
          <Anchor href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
            https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
          </Anchor>
          .
        </div>
        <div>
          If you are located in Switzerland, the contact details for the data
          protection authorities are available here:{" "}
          <Anchor href="https://www.edoeb.admin.ch/edoeb/en/home.html">
            https://www.edoeb.admin.ch/edoeb/en/home.html
          </Anchor>
          .
        </div>
        <div>
          <strong>Withdrawing your consent:</strong> If we are relying on your
          consent to process your personal information, which may be express
          and/or implied consent depending on the applicable law, you have the
          right to withdraw your consent at any time. You can withdraw your
          consent at any time by contacting us by using the contact details
          provided in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS
          NOTICE?&quot; below.
        </div>
        <div>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </div>
        <div>
          <strong>
            Opting out of marketing and promotional communications:
          </strong>{" "}
          You can unsubscribe from our marketing and promotional communications
          at any time by clicking on the unsubscribe link in the emails that we
          send, or by contacting us using the details provided in the section
          &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot; below. You will
          then be removed from the marketing lists. However, we may still
          communicate with you &mdash; for example, to send you service-related
          messages that are necessary for the administration and use of your
          account, to respond to service requests, or for other non-marketing
          purposes.
        </div>
        <div>
          <strong>Account Information</strong>
        </div>
        <div>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </div>
        <ul>
          <li>Log in to your account settings and update your user account.</li>
          <li>Contact us using the contact information provided.</li>
        </ul>
        <div>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </div>
        <div>
          <strong>Cookies and similar technologies:</strong> Most Web browsers
          are set to accept cookies by default. If you prefer, you can usually
          choose to set your browser to remove cookies and to reject cookies. If
          you choose to remove cookies or reject cookies, this could affect
          certain features or services of our Services. To opt out of
          interest-based advertising by advertisers on our Services visit{" "}
          <Anchor href="http://www.aboutads.info/choices/">
            http://www.aboutads.info/choices/
          </Anchor>
          .{" "}
        </div>
        <div>
          If you have questions or comments about your privacy rights, you may
          email us at admin@sqrlplanner.com.
        </div>

        <Heading>11. CONTROLS FOR DO-NOT-TRACK FEATURES</Heading>

        <div>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&quot;DNT&quot;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this privacy notice.
        </div>

        <Heading>12. DO WE MAKE UPDATES TO THIS NOTICE?</Heading>

        <InShort>
          <strong>In Short:&nbsp;</strong>
          Yes, we will update this notice as necessary to stay compliant with
          relevant laws.
        </InShort>
        <div>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date and
          the updated version will be effective as soon as it is accessible. If
          we make material changes to this privacy notice, we may notify you
          either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this privacy
          notice frequently to be informed of how we are protecting your
          information.
        </div>

        <Heading>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Heading>

        <div>
          If you have questions or comments about this notice, you may email us
          at admin@sqrlplanner.com
        </div>

        <Heading>
          14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </Heading>

        <div>
          You have the right to request access to the personal information we
          collect from you, change that information, or delete it. To request to
          review, update, or delete your personal information, please fill out
          and submit a&nbsp;
          <Anchor href="https://app.termly.io/notify/f8af9e72-0b31-4acf-8dc5-24d56be457ec">
            data subject access request
          </Anchor>
          .
        </div>
      </div>
    </>
  )
}

Privacy.getLayout = pageLayout

export default Privacy

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "privacy",
      ])),
      // Will be passed to the page component as props
    },
  }
}
