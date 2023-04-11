import React from "react"
import clsx from "clsx"

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
