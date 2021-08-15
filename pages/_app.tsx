import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import React from "react"
import "../styles/globals.css"

function Application({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default appWithTranslation(Application)
