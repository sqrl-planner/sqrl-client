import React from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { AuthModal } from "@/components/common"
import { pageLayout, Title } from "@/components/dashboard"

import { NextPageWithLayout } from "./_app"

const Profile: NextPageWithLayout = () => {
  const { t } = useTranslation("profile")

  const supabaseClient = useSupabaseClient()
  const user = useUser()
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

  if (!user) return <AuthModal />

  return (
    <>
      <Title>{t("dashboard:profile")}</Title>
      bello
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
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
