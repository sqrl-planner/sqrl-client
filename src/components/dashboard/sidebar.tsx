import React, { ComponentProps, forwardRef, Ref } from "react"
import {
  ArchiveIcon,
  BarChartIcon,
  CalendarIcon,
  DiscordLogoIcon,
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

import { Rule, Select } from "@/components/ui"

const _LanguageSelectorContent = (
  { children, ...props }: ComponentProps<"button">,
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <button
      className={clsx(
        "inline-flex select-none items-center justify-start px-0 py-1",
        "inline-block py-1 transition",
        "flex items-center gap-1.5",
        "focus:outline-none focus-visible:ring ",
        // Register all radix states
        "focus:outline-none",
        "opacity-60 hover:opacity-80",
        "group"
      )}
      ref={ref}
      {...props}
    >
      <GlobeIcon className="h-2.5 w-2.5" />
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
  const router = useRouter()

  const isCurrent = pathname === href

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (isCurrent) {
          // reload window
          e.preventDefault()
          router.reload()
        }
      }}
      className={clsx(
        "inline-block py-1 transition",
        "flex items-center gap-3",
        "select-none",
        {
          "opacity-60 hover:opacity-80": !isCurrent,
          "cursor-default opacity-100": isCurrent,
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
        "z-0 lg:fixed lg:inset-auto lg:w-72",
        "h-auto lg:max-h-[calc(100vh-theme(space.14))] lg:overflow-y-auto",
        "flex flex-col gap-4 p-4",
        "group"
      )}
    >
      <ul className="mt-4 flex flex-col">
        <li>
          <SidebarLink href="/">
            <HomeIcon className="h-4 w-4" />
            {t("for-you")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/courses">
            <ArchiveIcon className="h-4 w-4" />
            {t("courses")}
          </SidebarLink>
        </li>
      </ul>
      <Rule />
      <ul className="flex flex-col">
        <li>
          <SidebarLink href="/timetables">
            <CalendarIcon className="h-4 w-4" />
            {t("timetables")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/shared">
            <Share1Icon className="h-4 w-4" />
            {t("shared")}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/settings">
            <GearIcon className="h-4 w-4" />
            {t("settings")}
          </SidebarLink>
        </li>
      </ul>
      <Rule />
      <ul>
        <li>
          <SidebarLink href="/profile">
            <PersonIcon className="h-4 w-4" />
            {t("profile")}
          </SidebarLink>
        </li>
      </ul>

      <Rule />
      <ul>
        <li>
          <SidebarLink target="_blank" rel="noopener noreferrer" href="/shop">
            <BarChartIcon />
            {t("shop")}
            <ExternalLinkIcon className="-ml-2 h-3 w-3" />
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            target="_blank"
            rel="noopener noreferrer"
            href="/discord"
          >
            <DiscordLogoIcon />
            {t("discord")}
            <ExternalLinkIcon className="-ml-2 h-3 w-3" />
          </SidebarLink>
        </li>
      </ul>

      <Rule />
      <div className="flex flex-col gap-4 text-xs font-medium">
        <div className="flex flex-col items-start">
          <SidebarLink href="/about">{t("about")}</SidebarLink>
          <SidebarLink href="/privacy">{t("privacy")}</SidebarLink>
          <SidebarLink href="/terms">{t("terms")}</SidebarLink>
          <SidebarLink target="_blank" rel="noopener noreferrer" href="/github">
            {t("contribute")} <ExternalLinkIcon className="-ml-2 h-3 w-3" />
          </SidebarLink>
          <SidebarLink href="/feedback">{t("feedback")}</SidebarLink>
        </div>

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
        <div className="-mt-4 opacity-60">
          &copy; 2023 Sqrl Planner. {t("all-rights-reserved")}
        </div>
      </div>
    </motion.nav>
  )
}

export default Sidebar
