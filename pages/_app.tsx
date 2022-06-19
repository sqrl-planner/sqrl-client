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

function Application({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AnimatePresence>
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
        w={800}
        left={router.pathname === "/" ? 80 : 20}
        top={router.pathname === "/" ? 48 : 4}
      >
        <Link href="/">
          <chakra.a
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
              sx={{ transition: "transform 0.2s ease-in-out" }}
              fontSize="2.4rem"
              transform={`scale(${
                router.pathname === "/" ? 1 : 0.8
              }) translateX(${router.pathname === "/" ? "0" : "-0.6rem"})`}
              fontWeight={600}
            >
              Sqrl{" "}
              {router.pathname === "/" ? (
                <motion.span
                  key="planner-append"
                  layoutId="planner-append"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Planner
                </motion.span>
              ) : (
                ""
              )}
            </Heading>
          </chakra.a>
        </Link>
      </Box>
      <Component {...pageProps} />
    </AnimatePresence>
  )
}

export default appWithTranslation(Application)
