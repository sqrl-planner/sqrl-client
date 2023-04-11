import React, {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
} from "react"
import clsx from "clsx"

const _Button: ForwardRefRenderFunction<HTMLButtonElement> = (
  { className, ...rest }: ComponentProps<"button">,
  ref
) => {
  return (
    <button
      className={clsx(
        "h-9 rounded-lg px-5 pt-0.5 leading-none",
        "flex items-center justify-center",
        "bg-blue-600 text-white",
        "text-md font-semibold",
        "shadow-md transition hover:shadow-lg",
        // "hover:bg-blue-600 focus:bg-blue-600",
        // "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500",
        className
      )}
      {...rest}
    />
  )
}

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(_Button)

export default Button
