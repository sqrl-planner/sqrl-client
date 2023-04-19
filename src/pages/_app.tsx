import { ReactElement, ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/react"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import NextNProgress from "nextjs-progressbar"

import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          className: "!shadow-lg font-medium",
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#dcfce7",
            },
          },
        }}
      />
      <NextNProgress color="#0891b2" showOnShallow={false} />
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
