import { Analytics } from "@vercel/analytics/react"
import { NextPage } from "next"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import { ReactElement, ReactNode, useState } from "react"

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"

import "@/styles/globals.css"

const App = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ initialSession: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
  )

  const { initialSession, ...rest } = pageProps

  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={initialSession}
      >
        {getLayout(<Component {...rest} />)}
        <Analytics />
      </SessionContextProvider>
    </>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout
}

export default appWithTranslation(App)
