import React from "react"

import { HeaderLayout } from "../common"

import Sidebar from "./sidebar"

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
