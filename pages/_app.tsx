import { Box, chakra, Flex, Heading } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from "framer-motion"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import React from "react"
import "../styles/globals.css"
import SqrlLogo from "../public/sqrl-logo.png"
import { useRouter } from "next/router"
import Script from "next/script"

const headingVariants = {
  root: {
    scale: 1,
  },
  timetable: {
    scale: 0.8,
  },
}

function Application({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <React.Fragment>
      <Script>
        {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("${process.env.NEXT_PUBLIC_HEAP_ID}");`}
      </Script>
      <AnimatePresence exitBeforeEnter>
        <Box
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
          display="flex"
          left={router.pathname === "/" ? 80 : 20}
          top={router.pathname === "/" ? 48 : 8}
        >
          <Link href="/" passHref>
            <chakra.a
              w="auto"
              display="flex"
              cursor="pointer"
              alignItems="center"
              gap="0.8rem"
            >
              <Box
                as={motion.div}
                // layoutId="sqrl-logo"
                position="relative"
                // key="sqrl-logo"
                w={48}
                h={48}
              >
                <Image src={SqrlLogo} layout="fill" objectFit="contain" />
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
        <Component {...pageProps} />
      </AnimatePresence>
    </React.Fragment>
  )
}

export default appWithTranslation(Application)
