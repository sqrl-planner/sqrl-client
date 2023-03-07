import React from "react"
import clsx from "clsx"

type Props = {
  children: React.ReactNode
}

const Title = ({ children }: Props) => {
  return (
    <h1
      className={clsx(
        "text-5xl font-serif font-light",
        "lg:text-6xl",
        "xl:text-7xl"
      )}
    >
      {children}
    </h1>
  )
}

export default Title
