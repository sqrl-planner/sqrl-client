import React from "react"

type Props = {
  children: React.ReactNode
}

const Caption = ({ children }: Props) => {
  return (
    <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
      {children}
    </div>
  )
}

export default Caption
