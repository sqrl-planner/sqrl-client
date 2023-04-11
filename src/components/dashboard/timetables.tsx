import React from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { useTranslation } from "next-i18next"

import { Select } from "@/components/ui"
import { Session, Timetable } from "@/types"

import Title from "../common/title"

import TimetableCard from "./timetableCard"

const sampleSession: Session = {
  year: 2022,
  season: "regular",
  subsession: "first",
}

const sampleTimetable: Timetable = {
  id: "123",
  name: "saved-frog",
  sections: {
    "CSC110H1F-202309F": ["L0101", "L0102", "L0103", "L0104", "L0105"],
  },
  deleted: false,
  session: sampleSession,
}

const Timetables = () => {
  const { t } = useTranslation("timetables")

  return (
    <>
      <Title>{t("dashboard:timetables")}</Title>

      <div className="flex items-center justify-between text-xl font-medium">
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
            className={clsx("absolute", "inset-y-0 left-3 m-auto", "h-5 w-5")}
          />
          <input
            type="text"
            placeholder="Search"
            className="rounded-full border p-1.5 py-1 pt-1.5 pl-10 text-base"
          />
        </span>
      </div>

      <div className="grid w-full gap-4 pb-8 sm:grid-cols-2">
        {[...new Array(30)].map((_, i) => (
          <TimetableCard timetable={sampleTimetable} key={i} />
        ))}
      </div>
    </>
  )
}

export default Timetables
