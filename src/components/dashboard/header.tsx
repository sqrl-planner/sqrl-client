import React from "react"
import Wordmark from "../common/wordmark"

const Header = () => {
  return (
    <header className="w-full border-b-[#80808080] border-b-[0.8px] flex flex-col justify-center h-14">
      <div className="max-w-7xl w-full m-auto">
        <Wordmark />
      </div>
    </header>
  )
}

export default Header
