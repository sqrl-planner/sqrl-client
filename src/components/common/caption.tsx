import React from "react"

type Props = {
  children: React.ReactNode
}

const Caption = ({ children }: Props) => {
  return (
    <div className="uppercase text-xs tracking-wide font-semibold opacity-70">
      {children}
    </div>
  )
}

export default Caption
