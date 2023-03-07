import React, { ComponentProps } from "react"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  ExternalLinkIcon,
  HamburgerMenuIcon,
  Pencil1Icon,
  Share2Icon,
  StarIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import clsx from "clsx"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import { Caption } from "../common"

const DropdownItem = ({
  children,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode
} & ComponentProps<typeof DropdownMenu.Item>) => {
  return (
    <DropdownMenu.Item
      className={clsx(
        "flex cursor-default select-none items-center px-4 py-2 ",
        "text-gray-800 focus:bg-gray-100",
        "focus:outline focus:outline-2",
        "hover:outline-none",
        "text-base",
        className
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </DropdownMenu.Item>
  )
}

const TimetableCard = () => {
  const { t } = useTranslation("timetables")

  return (
    <AspectRatio.Root ratio={2 / 1}>
      <Link
        href="#"
        className="w-full h-full bg-slate-50 rounded-lg shadow-md flex flex-col justify-between items-start text-left p-4 hover:outline-blue-500 focus:outline-blue-500 hover:shadow-xl focus:shadow-xl outline outline-2 outline-transparent transition-all relative"
      >
        <div>
          <Caption>2022 Fall–2023 Winter</Caption>
          <h1 className="text-xl font-serif">saved-frog</h1>
        </div>
        <div>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger
              asChild
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className={clsx(
                "flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              )}
            >
              <button>
                <HamburgerMenuIcon />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                loop
                sideOffset={5}
                className={clsx(
                  "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                  "w-48 rounded-lg px-0 py-1 shadow-xl md:w-56",
                  "font-medium",
                  "bg-white"
                )}
              >
                <DropdownItem>
                  <Pencil1Icon className="mr-2" />
                  {t("rename")}
                </DropdownItem>

                <DropdownItem>
                  <Share2Icon className="mr-2" />
                  {t("share")}
                </DropdownItem>

                <DropdownItem>
                  <ExternalLinkIcon className="mr-2" />
                  {t("open-in-new-tab")}
                </DropdownItem>

                <DropdownMenu.Separator className="py-[0.4px] my-1.5 h-[0px] bg-gray-200" />

                <DropdownItem>
                  <StarIcon className="mr-2" />
                  {t("mark-as-main")}
                </DropdownItem>

                <DropdownMenu.Separator className="py-[0.4px] my-1.5 h-[0px] bg-gray-200" />

                <DropdownItem className="!text-red-600">
                  <TrashIcon className="mr-2" />
                  {t("delete")}
                </DropdownItem>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          {/* <button className="font-medium text-blue-600">Rename</button> */}
        </div>
      </Link>
    </AspectRatio.Root>
  )
}

export default TimetableCard
