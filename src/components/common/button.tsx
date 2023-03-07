import React, { ComponentProps } from "react"
import clsx from "clsx"

const Button = ({ className, ...rest }: ComponentProps<"button">) => {
  return (
    <button
      className={clsx(
        "px-5 h-9 pt-0.5 leading-none rounded-lg",
        "flex items-center justify-center",
        "bg-blue-500 text-white",
        "font-semibold text-md",
        "shadow-md hover:shadow-lg transition",
        // "hover:bg-blue-600 focus:bg-blue-600",
        // "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500",
        className
      )}
      {...rest}
    >
      Button
    </button>
  )
}

export default Button
