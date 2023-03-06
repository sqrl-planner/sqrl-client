import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { appWithTranslation } from "next-i18next"

import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0e7490" />
        <meta name="msapplication-TileColor" content="#0e7490" />
        {/* <meta
          name="theme-color"
          content="#f6f8fa"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#161b22"
          media="(prefers-color-scheme: dark)"
        /> */}

        <meta name="theme-color" content="#ebebe4" />
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default appWithTranslation(App)
