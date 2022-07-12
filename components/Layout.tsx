import { Box, chakra, Heading, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { useRouter } from "next/router"

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

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  const logoColour = useColorModeValue("black", "white")

  return (
    <Box display="relative">
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
        w={10}
        left={router.pathname === "/" ? 8 : 1}
        top={router.pathname === "/" ? 8 : -1}
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
                  fill={logoColour}
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
      {children}
    </Box>
  )
}

export default Layout
