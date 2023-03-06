import React, { useEffect, useState } from "react"
import Header from "./header"
import Sidebar from "./sidebar"

import { ErrorBoundary } from "react-error-boundary"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      <div className="p-8 ml-72 gap-6 flex flex-col h-full">
        <h1 className="text-7xl font-serif">Something went wrong</h1>
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [isiOSSafari, setIsiOSSafari] = useState(false)

  useEffect(() => {
    const ua = window.navigator.userAgent
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    const webkit = !!ua.match(/WebKit/i)
    setIsiOSSafari(iOS && webkit && !ua.match(/CriOS/i))
  }, [])

  const content = (
    <div className={"w-full min-h-screen flex justify-center bg-[#EBEBE4]"}>
      <Header />
      <div className="flex pt-16 w-full max-w-7xl lg:flex-row flex-col relative">
        <Sidebar />

          {children}
      </div>
    </div>
  )

  if (isiOSSafari)
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>{content}</ErrorBoundary>
    )

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ScrollArea.Root className="w-full h-screen">
        <ScrollArea.Viewport className="w-full h-full">
          {content}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={clsx(
            "z-20 p-1 w-4 flex",
            "bg-gray-300 bg-opacity-30",
            "hover:bg-opacity-100",
            "transition-all"
          )}
          orientation="vertical"
        >
          <ScrollArea.Thumb
            className={clsx(
              "bg-gray-600 rounded-full relative flex-1",
              "before:absolute before:inset-0 before:bg-gray-300 before:bg-opacity-50 before:min-h-[44px] before:min-w-[44px]"
            )}
          />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </ErrorBoundary>
  )
}

export default Layout
