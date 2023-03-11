import clsx from "clsx"
import { DocumentProps, Head, Html, Main, NextScript } from "next/document"
import { useRouter } from "next/router"
import Script from "next/script"

export default function Document({ locale }: DocumentProps) {
  return (
    <Html className="font-sans">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/kir8wnz.css" />
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
