import React from "react"
import { useEffect, useState } from "react"
import { Configuration, FrontendApi, Identity,Session } from "@ory/client"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { pageLayout, Title } from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"
// import { edgeConfig } from "@ory/integrations/next"

// const ory = new FrontendApi(new Configuration(edgeConfig))

const basePath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_ORY_SDK_URL

const SqrlIDPath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.NEXT_PUBLIC_SQRL_ID_URL

const ory = new FrontendApi(
  new Configuration({
    basePath: basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
)

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username

const Profile: NextPageWithLayout = () => {
  const { t } = useTranslation("profile")

  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch(() => {
        // Redirect to login page
        return router.push(SqrlIDPath + "/login")
      })
  }, [router])

  if (!session) {
    // Still loading
    return null
  }

  // const supabaseClient = useSupabaseClient()
  // const user = useUser()
  // const [data, setData] = useState()

  // console.log(user)

  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from("test").select("*")
  //     setData(data)
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData()
  // }, [user])

  // if (!user) return <AuthModal />

  return (
    <>
      <Title>{t("dashboard:profile")}</Title>
      <p>Hello, {getUserName(session?.identity)}</p>
      <div>
        <p>
          <a href={logoutUrl}>Log out</a>
        </p>
      </div>
      {/* bello
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p> */}
    </>
  )
}

Profile.getLayout = pageLayout

export default Profile

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "profile",
      ])),
      // Will be passed to the page component as props
    },
  }
}
