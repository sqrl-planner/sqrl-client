import React, {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
} from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import clsx from "clsx"

type Props = {
  options: [string, string][]
  value: string
  onChange: (value: string) => void
  trigger?: React.ElementType
}

const _SelectTrigger: ForwardRefRenderFunction<HTMLButtonElement> = (
  { children, ...props }: ComponentProps<"button">,
  ref
) => (
  <button
    ref={ref}
    {...props}
    className={clsx(
      "inline-flex select-none items-center justify-start px-0 py-1 font-medium",
      "inline-block py-1 transition",
      "flex items-center gap-3",
      "focus:outline-none focus-visible:ring ",
      // Register all radix states
      "focus:outline-none",
      //   "hover:opacity-80 opacity-60",
      "group"
    )}
  >
    {children}
  </button>
)

const SelectTrigger = forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<"button">, "className"> & {}
>(_SelectTrigger)

const Select = ({ options, value, onChange, trigger }: Props) => {
  const Trigger = trigger || SelectTrigger
  return (
    <SelectPrimitive.Root
      defaultValue={value}
      value={value}
      onValueChange={onChange}
    >
      <SelectPrimitive.Trigger asChild>
        <Trigger>
          <>
            <SelectPrimitive.Value />
            <SelectPrimitive.Icon className="-ml-1">
              <ChevronUpIcon className="relative" />
              <ChevronDownIcon className="relative -mt-2" />
            </SelectPrimitive.Icon>
          </>
        </Trigger>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="relative z-20">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 ">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="relative z-30 rounded-lg bg-white px-0 py-1 shadow-xl">
          <SelectPrimitive.Group>
            {options.map((f, i) => (
              <SelectPrimitive.Item
                key={`${f}-${i}`}
                value={f[1]}
                className={clsx(
                  "flex cursor-default select-none items-center px-4 py-2 pl-8 ",
                  "text-gray-800 focus:bg-gray-100",
                  "focus:outline focus:outline-2",
                  "hover:outline-none"
                )}
              >
                <SelectPrimitive.ItemText>{f[0]}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className=" h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
