import { useTranslation } from "next-i18next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import React from "react"

const SidebarRule = () => {
  return <hr className="border-t-[#80808080] border-t-[0.8px]" />
}

const SidebarLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  let className = "text-black text-opacity-60 "
  if (pathname === href) {
    className = `font-semibold text-black text-opacity-100`
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

const Sidebar = () => {
  const { t } = useTranslation("dashboard")

  return (
    <nav className="font-medium text-xl flex flex-col gap-4 w-72 h-full p-4">
      <ul className="flex flex-col gap-3 mt-4">
        <li>
          <SidebarLink href="#">✨ {t("for-you")} ✨</SidebarLink>
        </li>
        <li>
          <SidebarLink href="#">{t("courses")}</SidebarLink>
        </li>
      </ul>
      <SidebarRule />
      <ul className="flex flex-col gap-3">
        <li>
          <SidebarLink href="/timetables">{t("timetables")}</SidebarLink>
        </li>
        <li>
          <SidebarLink href="/shared">{t("shared-with-me")}</SidebarLink>
        </li>
        <li>
          <SidebarLink href="/settings">{t("settings")}</SidebarLink>
        </li>
      </ul>
      <SidebarRule />
      <div className="flex flex-col gap-1 text-xs font-semibold">
        <SidebarLink href="/about">{t("about")}</SidebarLink>
        <SidebarLink href="/privacy">{t("privacy-policy")}</SidebarLink>
        <SidebarLink href="/terms">{t("terms-of-use")}</SidebarLink>
        <SidebarLink href="https://github.com/sqrl-planner">GitHub</SidebarLink>
        <SidebarLink href="/feedback">{t("feedback")}</SidebarLink>
        <div className="mt-2 opacity-60">&copy; 2023 Sqrl Planner. All rights reserved.</div>
      </div>
    </nav>
  )
}

export default Sidebar
