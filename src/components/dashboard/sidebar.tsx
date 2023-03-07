import React, { ComponentProps, forwardRef } from "react"
import {
  ArchiveIcon,
  CalendarIcon,
  GearIcon,
  GlobeIcon,
  HomeIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as Select from "@radix-ui/react-select"
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { Rule } from "../common"

const LanguageSelectorContent = forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<"button">, "className"> & {}
>(({ children, ...props }: any, ref) => (
  <button
    ref={ref}
    {...props}
    className={clsx(
      "inline-flex select-none items-center justify-start px-0 py-1 font-medium",
      "py-1 inline-block transition",
      "flex items-center gap-3",
      // "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-900",
      // "hover:bg-gray-50",
      // "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
      // Register all radix states
      "focus:outline-none",
      "hover:opacity-80 opacity-60",
      "group"
      // "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
      // "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
      // "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50"
    )}
  >
    {children}
  </button>
))

LanguageSelectorContent.displayName = "LanguageSelectorContent"

const SidebarLink = ({
  href,
  children,
  ...rest
}: {
  href: string
  children: React.ReactNode
} & ComponentProps<typeof Link>) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      scroll
      className={clsx(
        "py-1 inline-block transition",
        "flex items-center gap-3",
        "",
        {
          "hover:opacity-80 opacity-60": pathname !== href,
          "opacity-100": pathname === href,
        }
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

const Sidebar = () => {
  const { t, i18n } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()

  const onChangeLanguage = (value: string) => {
    router.push(pathname, pathname, { locale: value })
  }

  return (
    <motion.nav
      className={clsx(
        "lg:fixed z-0",
        "lg:w-72 lg:inset-auto",
        // "top-0 right-0",
        "font-medium text-xl flex flex-col gap-4 p-4",
        "group"
      )}
    >
      <ul className="flex flex-col mt-4">
        <li>
          <SidebarLink href="/">
            <HomeIcon className="w-4 h-4" />
            {t("for-you")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/courses">
            <ArchiveIcon className="w-4 h-4" />
            {t("courses")}
          </SidebarLink>
        </li>
      </ul>
      <Rule />
      <ul className="flex flex-col">
        <li>
          <SidebarLink href="/timetables">
            <CalendarIcon className="w-4 h-4" />
            {t("timetables")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/shared">
            <Share1Icon className="w-4 h-4" />
            {t("shared-with-me")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/settings">
            <GearIcon className="w-4 h-4" />
            {t("settings")}
          </SidebarLink>
        </li>
      </ul>
      <Rule />
      <ul>
        <li>
          <SidebarLink href="/profile">
            <PersonIcon className="w-4 h-4" />
            {t("profile")}
          </SidebarLink>
        </li>
      </ul>
      <Rule />

      <Select.Root
        defaultValue={i18n.language}
        value={i18n.language}
        onValueChange={onChangeLanguage}
      >
        <Select.Trigger asChild>
          {/* <Button> */}
          <LanguageSelectorContent>
            <GlobeIcon className="w-4 h-4" />
            <Select.Value />
            <Select.Icon className="-ml-1">
              <ChevronDownIcon />
            </Select.Icon>
          </LanguageSelectorContent>
          {/* </Button> */}
        </Select.Trigger>
        <Select.Content className="relative z-20">
          <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 ">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="bg-white px-0 rounded-lg shadow-xl py-1 relative z-30">
            <Select.Group>
              {[
                ["English", "en"],
                ["Français", "fr"],
                ["简体中文", "zh"],
              ].map((f, i) => (
                <Select.Item
                  // disabled={f === "Grapes"}
                  key={`${f}-${i}`}
                  value={f[1]}
                  // className={clsx(
                  //   "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900",
                  //   "radix-disabled:opacity-50",
                  //   "focus:outline-none select-none"
                  // )}
                  className={clsx(
                    "flex cursor-default select-none items-center px-4 pl-8 py-2 ",
                    "text-gray-800 focus:bg-gray-100",
                    "focus:outline focus:outline-2",
                    "hover:outline-none",
                    "text-base"
                  )}
                >
                  <Select.ItemText>{f[0]}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>

      {/* <SidebarLink href="/profile">gay</SidebarLink> */}
      <Rule />
      <div className="flex flex-col items-start text-xs font-semibold">
        <SidebarLink href="/about">{t("about")}</SidebarLink>
        <SidebarLink href="/privacy">{t("privacy-policy")}</SidebarLink>
        <SidebarLink href="/terms">{t("terms-of-use")}</SidebarLink>
        <SidebarLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/sqrl-planner"
        >
          GitHub
        </SidebarLink>
        <SidebarLink href="/feedback">{t("feedback")}</SidebarLink>
        <div className="mt-2 opacity-60">
          &copy; 2023 Sqrl Planner. {t("all-rights-reserved")}
        </div>
      </div>
    </motion.nav>
  )
}

export default Sidebar
