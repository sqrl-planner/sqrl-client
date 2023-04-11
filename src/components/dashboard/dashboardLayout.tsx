import React, { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"

import Header from "./header"
import Sidebar from "./sidebar"
import { HeaderLayout } from "../common"

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <HeaderLayout>
      <div className="relative flex w-full max-w-7xl flex-col pt-14 lg:flex-row">
        <Sidebar />
        {children}
      </div>
    </HeaderLayout>
  )
}

export default DashboardLayout
