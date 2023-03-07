import { ReactElement, ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import { appWithTranslation } from "next-i18next"

import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default appWithTranslation(App)
