import React from "react"
import Header from "./header"
import Sidebar from "./sidebar"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="w-full min-h-screen bg-[#EBEBE4]">
      <Header />
      <main className="flex w-full max-w-7xl m-auto">
        <Sidebar />
        {children}
      </main>
    </div>
  )
}

export default Layout
