import React from "react"
import TimetableCard from "./timetableCard"
import { useTranslation } from "next-i18next"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import clsx from "clsx"

const Timetables = () => {
  const { t } = useTranslation("timetables")

  return (
    <>
      <h1 className="text-7xl font-serif">Timetables</h1>

      <div className="flex justify-between items-center text-xl font-medium">
        <div>{t("sort-by")}</div>
        <span className="relative">
          <MagnifyingGlassIcon
            className={clsx("absolute", "left-2 inset-y-0 m-auto", "h-6 w-6")}
          />
          <input
            type="text"
            placeholder="Search"
            className="shadow rounded-md p-2 px-3 pt-[0.6rem] pl-12 text-lg leading-snug"
          />
        </span>
      </div>

      <div className="grid w-full pb-8 sm:grid-cols-2 gap-4">
        {[...new Array(30)].map((_, i) => (
          <TimetableCard key={i} />
        ))}
      </div>
    </>
  )
}

export default Timetables
