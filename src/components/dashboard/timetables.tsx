import React from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { useTranslation } from "next-i18next"

import TimetableCard from "./timetableCard"
import Title from "../common/title"
import { Select } from "../common"

const Timetables = () => {
  const { t } = useTranslation("timetables")

  return (
    <>
      <Title>{t("dashboard:timetables")}</Title>

      <div className="flex justify-between items-center text-xl font-medium">
        <div className="flex items-center">
          {t("sort-by")}
          <div className="ml-2 text-black text-opacity-70">
            <Select
              options={[
                ["name", t("name")],
                ["date", t("date")],
              ]}
              value="name"
              onChange={() => {}}
            />
          </div>
        </div>
        <span className="relative">
          <MagnifyingGlassIcon
            className={clsx("absolute", "left-2 inset-y-0 m-auto", "h-6 w-6")}
          />
          <input
            type="text"
            placeholder="Search"
            className="shadow rounded-lg p-2 px-3 pt-[0.6rem] pl-12 text-base leading-snug"
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
