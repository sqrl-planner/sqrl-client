import React from "react"
import { Caption } from "../common"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"

const TimetableCard = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <Link href="#" className="w-96 h-56 bg-white rounded-lg shadow-md flex flex-col justify-between items-start text-left p-4 hover:outline-blue-500 focus:outline-blue-500 hover:shadow-xl focus:shadow-xl outline outline-2 outline-transparent transition-all">
      <div>
        <Caption>2022 Fall–2023 Winter</Caption>
        <h1 className="text-xl font-serif">saved-frog</h1>
      </div>
      <div>
        {/* <button className="font-medium text-blue-600">Rename</button> */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            asChild
            className="rounded-full p-2 hover:bg-gray-100 transition-all"
          >
            <button className="IconButton" aria-label="Customise options">
              <HamburgerMenuIcon />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56 bg-white"
              sideOffset={5}
            >
              <DropdownMenu.Item className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none font-semibold  focus:bg-gray-50 ">
              Rename
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-gray-200" />


              <DropdownMenu.Item className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none font-semibold  focus:bg-gray-50 ">
              Delete
              </DropdownMenu.Item>
            
              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </Link>
  )
}

export default TimetableCard
