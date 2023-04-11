import clsx from "clsx"
import React from "react"

type Props = {
  className?: string
}

const Rule = ({ className }: Props & React.ComponentPropsWithoutRef<"hr">) => {
  return (
    <hr
      className={clsx(
        "w-full border-t-[0.8px] border-t-[#80808080]",
        className
      )}
    />
  )
}

export default Rule
