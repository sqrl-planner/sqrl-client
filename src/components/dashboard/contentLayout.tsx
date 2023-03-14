import React from "react"
import { ErrorBoundary } from "react-error-boundary"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
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
      <div className="p-8 gap-6 flex flex-col">
        <h1 className="text-7xl font-serif">Something went wrong</h1>
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
      duration: 0.00,
    },
  },
}

type Props = {
  children: React.ReactNode
}

const ContentLayout = ({ children }: Props) => {
  const pathname = usePathname()
  const {i18n} = useTranslation()

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
            "lg:pl-2 lg:ml-72 lg:mr-4",
            "w-full p-4 pt-8 pb-10 gap-6 flex flex-col h-full"
          )}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default ContentLayout
