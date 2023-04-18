import React from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useTranslation } from "next-i18next"

import { Select } from "@/components/ui"
import { Session, Timetable } from "@/types"

import { Input } from "../common"
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

      <div className="flex items-center justify-between text-lg">
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

        <Input icon={MagnifyingGlassIcon} type="text" placeholder="Search" />
        {/* <input
            type="text"
            placeholder="Search"
            className="h-8 rounded-xl border pl-10 text-base"
          /> */}
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
