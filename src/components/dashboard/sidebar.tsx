import React, { ComponentProps } from "react"
import { RemoveScroll } from "react-remove-scroll"
import {
  ArchiveIcon,
  CalendarIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons"
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "next-i18next"

import { Rule } from "../common"

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
      className={clsx(
        "py-1 inline-block hover:opacity-80 transition",
        "flex items-center gap-3",
        {
          "opacity-60": pathname !== href,
        }
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

const Sidebar = () => {
  const { t } = useTranslation("dashboard")

  return (
    <motion.nav
      className={clsx(
        "lg:fixed z-0",
        "lg:w-72 lg:inset-auto",
        // "top-0 right-0",
        "font-medium text-xl flex flex-col gap-4 h-full p-4"
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
          &copy; 2023 Sqrl Planner. All rights reserved.
        </div>
      </div>
    </motion.nav>
  )
}

export default Sidebar
