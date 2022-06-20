import {
  Box,
  chakra,
  ChakraProvider,
  extendTheme,
  Heading,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
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
})

const headingVariants = {
  root: {
    scale: 1,
    x: -4,
  },
  timetable: {
    scale: 0.8,
    x: -12,
  },
}

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
      <Box
        display="flex"
        key="sqrl-logo-container"
        as={motion.div}
        layoutId="sqrl-logo"
        m={4}
        ml={6}
        fontSize={{ base: "3xl", md: "4xl" }}
        position="absolute"
        zIndex={20}
        h={48}
        w={10}
        left={router.pathname === "/" ? 80 : 10}
        top={router.pathname === "/" ? 48 : 8}
      >
        <Link href="/" passHref>
          <chakra.a
            w="auto"
            display="flex"
            justifyContent="center"
            cursor="pointer"
            alignItems="center"
            gap="0.8rem"
          >
            <Box
              as={motion.div}
              // layoutId="sqrl-logo"
              position="relative"
              // key="sqrl-logo"
              w={70}
              // h={48}
            >
              <chakra.svg
                as={motion.svg}
                w="100%"
                h="100%"
                id="Sqrl_mark"
                data-name="Sqrl mark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 600"
              >
                <motion.path
                  id="_Compound_Path_"
                  data-name="&lt;Compound Path&gt;"
                  d="M637.2,419.85c14.42-20.66,33.06-50.63,33.06-67.42a49.55,49.55,0,0,0-58.82-48.69L583.12,173.18c31.54-22,35.16-55.26,35.16-55.26l-20-14.87S579.48,89.2,559.33,89.17V56a33.09,33.09,0,0,0-32.18,25.41V56S498.72,55.17,494,89L453.1,379.42A198.75,198.75,0,0,0,269.89,257.73a159,159,0,0,0-159,159A127.23,127.23,0,0,0,238.08,544,101.79,101.79,0,0,0,339.87,442.21H689.15S673.54,414.31,637.2,419.85ZM535.4,153.08a21.35,21.35,0,1,1,21.35-21.35A21.35,21.35,0,0,1,535.4,153.08Z"
                />
              </chakra.svg>

              {/* <Image alt="logo" src={SqrlLogo} layout="fill" objectFit="contain" /> */}
            </Box>
            <Heading
              as={motion.h1}
              key="sqrl-logo-wordmark"
              variants={headingVariants}
              animate={router.pathname === "/" ? "root" : "timetable"}
              transformOrigin="center left"
              fontSize="2.4rem"
              fontWeight={600}
            >
              Sqrl&nbsp;
              <AnimatePresence exitBeforeEnter>
                {router.pathname === "/" && (
                  <motion.span
                    key="planner-append"
                    // layout="position"
                    layoutId="planner-append"
                    // variants={headingVariants}
                    // animate={router.pathname === "/" ? "root" : "timetable"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Planner
                  </motion.span>
                )}
              </AnimatePresence>
            </Heading>
          </chakra.a>
        </Link>
      </Box>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </React.Fragment>
  )
}

export default appWithTranslation(Application)
