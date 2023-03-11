import React from "react"
import clsx from "clsx"
import Link from "next/link"

import Wordmark from "../common/wordmark"

const Header = () => {
  return (
    <header
      className={clsx(
        "w-full fixed border-b-[#80808080] border-b-[0.8px] flex flex-col justify-center h-14 px-4 bg-[#EBEBE4] z-10"
      )}
    >
      <div className="max-w-7xl w-full m-auto flex">
        <Link href="/">
          <Wordmark />
        </Link>
      </div>
    </header>
  )
}

export default Header