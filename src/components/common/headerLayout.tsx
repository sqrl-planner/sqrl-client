import React, { ReactElement, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"
import { Header } from "../dashboard"

// import Header from "./header"
// import Sidebar from "./sidebar"

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      <div className="ml-72 flex h-full flex-col gap-6 p-8">
        <h1 className="font-sans text-4xl">Something went wrong.</h1>
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
}

const HeaderLayout = ({ children }: Props) => {
  const [isiOSSafari, setIsiOSSafari] = useState(false)

  useEffect(() => {
    const ua = window.navigator.userAgent
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    const webkit = !!ua.match(/WebKit/i)
    setIsiOSSafari(iOS && webkit && !ua.match(/CriOS/i))
  }, [])

  const content = (
    <div className={"flex min-h-screen w-full justify-center bg-[#EBEBE4]"}>
      <Header />
      {children}
    </div>
  )

  if (isiOSSafari)
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>{content}</ErrorBoundary>
    )

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ScrollArea.Root className="h-screen w-full">
        <ScrollArea.Viewport className="h-full w-full">
          {content}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={clsx(
            "z-20 flex w-4 p-1",
            "bg-gray-300 bg-opacity-30",
            "hover:bg-opacity-100",
            "transition-all"
          )}
          orientation="vertical"
        >
          <ScrollArea.Thumb
            className={clsx(
              "relative flex-1 rounded-full bg-gray-600",
              "before:absolute before:inset-0 before:min-h-[44px] before:min-w-[44px] before:bg-gray-300 before:bg-opacity-50"
            )}
          />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </ErrorBoundary>
  )
}

export default HeaderLayout

export const headerPageLayout = (page: ReactElement) => (
  <HeaderLayout>{page}</HeaderLayout>
)
