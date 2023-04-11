import React from "react"
import clsx from "clsx"
import { AnimatePresence, motion, Variants } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "next-i18next"

import { Logo } from "../common"

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
    <div className="mx-3 h-6 w-[1px] rotate-[30deg] bg-gray-800 opacity-50"></div>
  )
}

const Header = () => {
  const { t } = useTranslation("common")
  const pathname = usePathname()
  const router = useRouter()

  const subpaths = pathname.split("/").filter((p) => p !== "")

  // TODO: Implement a vercel-esque header

  return (
    <header
      className={clsx(
        "fixed z-10 flex h-14 w-full flex-col justify-center border-b-[0.8px] border-b-[#80808080] bg-[#EBEBE4] px-4",
        "bg-opacity-60 backdrop-blur"
      )}
    >
      <div className="m-auto flex w-full max-w-7xl">
        <div className="eng-font flex items-center gap-1 font-serif text-xl">
          <Link href="/">
            <Logo />
          </Link>
          <AnimatePresence initial={false}>
            {pathname === "/" ? (
              <motion.div
                key={pathname}
                variants={variants}
                animate="in"
                initial="out"
                className="eng-font relative font-serif"
              >
                Sqrl Planner
              </motion.div>
            ) : (
              <>
                {subpaths.map((subpath, index) => {
                  return (
                    <React.Fragment key={subpath}>
                      <motion.div
                        key={subpath}
                        variants={variants}
                        animate="in"
                        initial="out"
                        className="flex items-center"
                      >
                        <BigSlash />
                        <Link
                          href={`/${subpaths.slice(0, index + 1).join("/")}`}
                        >
                          {t(`dashboard:${subpath}`)}
                        </Link>
                      </motion.div>
                    </React.Fragment>
                  )
                })}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Header
