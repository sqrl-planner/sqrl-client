import React, { ComponentProps, forwardRef, Ref } from "react"
import {
  ArchiveIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GearIcon,
  GlobeIcon,
  HomeIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons"
// import * as Select from "@radix-ui/react-select"
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { Rule, Select } from "@/components/common"

const _LanguageSelectorContent = (
  { children, ...props }: ComponentProps<"button">,
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <button
      className={clsx(
        "inline-flex select-none items-center justify-start px-0 py-1 font-medium",
        "py-1 inline-block transition",
        "flex items-center gap-3",
        "focus:outline-none focus-visible:ring ",
        // Register all radix states
        "focus:outline-none",
        "hover:opacity-80 opacity-60",
        "group"
      )}
      ref={ref}
      {...props}
    >
      <GlobeIcon />
      {children}
    </button>
  )
}

const LanguageSelectorContent = forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<"button">, "className"> & {}
>(_LanguageSelectorContent)

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
            {t("shared")}
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

      <Select
        options={[
          ["English", "en"],
          ["Français", "fr"],
          ["Esperanto", "eo"],
          ["Pirate", "pirate"],
          ["简体中文", "zh"],
        ]}
        value={i18n.language}
        onChange={onChangeLanguage}
        trigger={LanguageSelectorContent}
      />

      {/* <SidebarLink href="/profile">gay</SidebarLink> */}
      <Rule />
      <div className="flex flex-col items-start text-xs font-semibold">
        <SidebarLink href="/about">{t("about")}</SidebarLink>
        <SidebarLink href="/privacy">{t("privacy")}</SidebarLink>
        <SidebarLink href="/terms">{t("terms")}</SidebarLink>
        <SidebarLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/sqrl-planner"
        >
          GitHub <ExternalLinkIcon className="w-3 h-3 -ml-2" />
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
