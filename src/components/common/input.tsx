import React, { ComponentProps, ComponentType } from "react"
import clsx from "clsx"

type Variants = "default" | "rounded"

type Props = {
  variant?: Variants
  icon?: ComponentType<{ className?: string }>
} & Omit<ComponentProps<"input">, "className">

const Input = ({ variant, icon, ...rest }: Props) => {
  const Icon = icon || (() => null)
  return (
    <span className="relative">
      <Icon
        className={clsx("absolute", "inset-y-0 left-2 m-auto", "h-5 w-5")}
      />
      <input
        {...rest}
        className={clsx(
          "h-8 rounded-lg border border-black/10 px-3 text-base disabled:cursor-not-allowed disabled:opacity-70",
          {
            "pl-9": icon,
          }
        )}
      />
    </span>
  )
}

export default Input
