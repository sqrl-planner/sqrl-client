import {
  ChakraProvider,
  extendTheme,
  useToast,
} from "@chakra-ui/react"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import React, { useEffect, useState } from "react"
import "../styles/globals.css"
import { useRouter } from "next/router"
import Script from "next/script"
import { ApolloProvider } from "@apollo/client"
import client from "../src/apollo-client"
import Head from "next/head"

export const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "interstate-mono, monospace",
  },
  colors: {
    pinkish: {
      50: "#ffc7c7",
    },
    gray: {
      75: "#fafafa",
      50: "#F7FAFC",
      650: "#424b5c",
    },
    blue: {
      50: "#cffafe",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      // 700: '#0e7490',
      700: "rgb(59, 144, 173)",
      800: "#155e75",
      900: "#164e63",
    },
  },
  colorSchemes: {
    pinkish: "#ffc7c7",
  },
  components: {
    FormLabel: {
      baseStyle: {
        display: "flex",
        alignItems: "center",
      },
    },
  },
  initialColorMode: "light"
})

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

function Application({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const toast = useToast()

  const size = useWindowSize()

  useEffect(() => {
    if (size.width && size.width < 800) {
      if (toast.isActive("narrow-toast")) return
      toast({
        id: "narrow-toast",
        title: "For the best experience, use Sqrl on a wide screen device.",
        description:
          "We're working on an awesome mobile experience, but in the meantime, you may encounter overlapped UI elements, or unclosable panels.",
        isClosable: true,
        status: "warning",
        duration: null,
      })
    } else {
      toast.close("narrow-toast")
    }
  }, [size, toast])

  useEffect(() => {
    if (toast.isActive("warn-not-allowed")) {
      toast.close("warn-not-allowed")
    }
  })

  return (
    <React.Fragment>
      <Script id="heap">
        {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("${process.env.NEXT_PUBLIC_HEAP_ID}");`}
      </Script>
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
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </React.Fragment>
  )
}

export default appWithTranslation(Application)
