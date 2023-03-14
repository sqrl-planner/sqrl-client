import React, { forwardRef } from "react"
import clsx from "clsx"
import Link from "next/link"

import Wordmark from "../common/wordmark"
import { Logo, Select } from "../common"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "next-i18next"

const variants: Variants = {
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  out: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.14,
    },
  },
}

const BigSlash = () => {
  return (
    <motion.div
      layout
      className="opacity-50 mx-3 rotate-[30deg] w-[1px] h-6 bg-gray-800"
    ></motion.div>
  )
}

const Header = () => {
  const { t } = useTranslation("common")
  const pathname = usePathname()
  const router = useRouter()
  return (
    <header
      className={clsx(
        "w-full fixed border-b-[#80808080] border-b-[0.8px] flex flex-col justify-center h-14 px-4 bg-[#EBEBE4] z-10"
      )}
    >
      <div className="max-w-7xl w-full m-auto flex">
        <div className="font-serif eng-font text-xl flex items-center gap-1">
          <Link href="/">
            <Logo />
          </Link>
          <AnimatePresence mode="popLayout" initial={false}>
            {pathname === "/" ? (
              <motion.div
                key={pathname}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"
                className="relative font-serif eng-font"
              >
                Sqrl Planner
              </motion.div>
            ) : (
              <>
                <BigSlash />
                {pathname !== "/" && (
                  <>
                    <motion.div
                      key={pathname}
                      variants={variants}
                      animate="in"
                      initial="out"
                    >
                      {t(`dashboard:${pathname.replace("/", "")}`)}
                    </motion.div>
                  </>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Header
