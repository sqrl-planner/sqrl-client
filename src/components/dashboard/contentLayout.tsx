import React from "react"
import { ErrorBoundary } from "react-error-boundary"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTranslation } from "next-i18next"

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      <div className="flex flex-col gap-6 p-8">
        <h1 className="font-serif text-7xl">Something went wrong</h1>
      </div>
    </div>
  )
}

const variants = {
  in: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.0,
    },
  },
}

type Props = {
  children: React.ReactNode
}

const ContentLayout = ({ children }: Props) => {
  const pathname = usePathname()
  const { i18n } = useTranslation()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
          className={clsx(
            "lg:ml-72 lg:mr-4 lg:pl-2",
            "flex h-full w-full max-w-[100vw] flex-col gap-6 p-4 pt-8 pb-10"
          )}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default ContentLayout
