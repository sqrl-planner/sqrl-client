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

import { Timetable } from "@/types"

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

const TimetableCard = ({ timetable }: { timetable: Timetable }) => {
  const { t } = useTranslation("timetables")

  const openInNewTab = () => {
    window.open(`/timetables/${timetable.id}`, "_blank")
  }

  return (
    <AspectRatio.Root ratio={2 / 1}>
      <Link
        href="/timetables/123"
        className="relative flex h-full w-full flex-col items-start justify-between rounded-xl bg-slate-50 p-4 text-left shadow-md outline outline-2 outline-transparent transition-all focus:shadow-xl focus:outline-blue-700 hover:shadow-xl hover:outline-blue-700"
      >
        <div>
          <Caption>2022 Fall–2023 Winter</Caption>
          <h1 className="font-serif text-xl">saved-frog</h1>
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
                "flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 hover:bg-gray-200"
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
                  "radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up",
                  "w-48 rounded-lg px-0 py-1 shadow-xl md:w-56",
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

                <DropdownItem onClick={openInNewTab}>
                  <ExternalLinkIcon className="mr-2" />
                  {t("open-in-new-tab")}
                </DropdownItem>

                <DropdownMenu.Separator className="my-1.5 h-[0px] bg-gray-200 py-[0.4px]" />

                <DropdownItem>
                  <StarIcon className="mr-2" />
                  {t("mark-as-main")}
                </DropdownItem>

                <DropdownMenu.Separator className="my-1.5 h-[0px] bg-gray-200 py-[0.4px]" />

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
