import { Icon, CalendarIcon, DownloadIcon } from "@chakra-ui/icons"
import {
  Flex,
  Button,
  Text,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react"
import React, { useRef } from "react"
// import ics from "ics"
import ical from "ical-generator"
import MeetingsFabricator from "../src/MeetingsFabricator"
import { minuteOffsetToIcalArray } from "../src/utils/time"
import { dateToIcsString, SqrlIcsEvent } from "../src/utils/ics"
import { Meeting } from "./timetable/Meeting"
import useSections from "../src/useSections"
import useCourses from "../src/useCourses"
import { useTranslation } from "next-i18next"
// const ics = require("ics")

const ShareCalendar = () => {
  const { sections } = useSections()
  const { courses, userMeetings } = useCourses({
    sections,
  })

  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  const shareCalendar = async () => {
    const startTimes = {
      first: { year: 2022, month: 9, day: 8 },
      second: { year: 2023, month: 1, day: 9 },
    }
    const endTimes = {
      first: { year: 2022, month: 12, day: 8 },
      second: { year: 2023, month: 4, day: 6 },
    }
    const events: Array<SqrlIcsEvent> = []

    const segregatedMeetings = {
      first: MeetingsFabricator(courses, userMeetings, "FIRST_SEMESTER"),
      second: MeetingsFabricator(courses, userMeetings, "SECOND_SEMESTER"),
    }

    const calendar = ical({ name: "SqrlTimetable" })

    // calendar.timezone({
    //   name: "America/Toronto",
    //   generator: getVtimezoneComponent,
    // })

    for (const [semester, meetings] of Object.entries(
      segregatedMeetings
    ) as Array<["first" | "second", Meeting[]]>) {
      const semesterStart = Object.values(startTimes[semester]).join("-")
      const semesterEnd = Object.values(endTimes[semester]).join("-")
      for (const meeting of meetings) {
        const [startHour, startMinute] = minuteOffsetToIcalArray(
          meeting.startTime
        )
        const [endHour, endMinute] = minuteOffsetToIcalArray(meeting.endTime)

        const start = new Date(semesterStart)
        start.setHours(startHour)
        start.setMinutes(startMinute)

        // const end = new Date(semesterEnd)
        // end.setHours(endHour)
        // end.setMinutes(endMinute)
        const end = new Date(semesterStart)
        end.setHours(endHour)
        end.setHours(endMinute)

        calendar.createEvent({
          start,
          end,
          summary: `${meeting.title} ${meeting.category} ${meeting.section}`,
          repeating: `FREQ=WEEKLY;BYDAY=${meeting.day
            .substring(0, 2)
            .toUpperCase()};INTERVAL=1;${dateToIcsString(
            new Date(
              Date.UTC(
                endTimes[semester].year,
                endTimes[semester].month - 1,
                endTimes[semester].day + 1
              )
            )
          )}`,
          // timezone: "America/Toronto",
        })

        // events.push({
        //   summary: meeting.title,
        //   meeting,
        //   firstStart: new Date(
        //     Date.UTC(
        //       startTimes[semester].year,
        //       startTimes[semester].month - 1,
        //       startTimes[semester].day,
        //       startHour,
        //       startMinute
        //     )
        //   ),
        //   firstEnd: new Date(
        //     Date.UTC(
        //       startTimes[semester].year,
        //       startTimes[semester].month - 1,
        //       startTimes[semester].day,
        //       endHour,
        //       endMinute
        //     )
        //   ),
        //   rruleBeforeDate: `FREQ=WEEKLY;BYDAY=${meeting.day
        //     .substring(0, 2)
        //     .toUpperCase()};INTERVAL=1;`,
        //   rruleUntil: `${dateToIcsString(
        //     new Date(
        //       Date.UTC(
        //         endTimes[semester].year,
        //         endTimes[semester].month - 1,
        //         endTimes[semester].day + 1
        //       )
        //     )
        //   )}`,
        //   tzid: `America/Toronto`,
        // })
      }
    }

    if (!downloadRef.current) return

    downloadRef.current.href =
      "data:text/calendar;charset=utf8," + escape(calendar.toString())
    downloadRef.current.download = "SqrlTimetable"
    downloadRef.current.click()
  }

  const { t } = useTranslation("modal")

  return (
    <FormControl>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Text as="span" display="flex" alignItems="center">
          <Icon as={CalendarIcon} mr={2} /> {t("export-ical")}
        </Text>
        <Button colorScheme="blue" bg="blue.700" onClick={shareCalendar}>
          <DownloadIcon mr={2} />
          {t("download-ical")}
        </Button>
        <a ref={downloadRef} style={{ display: "none" }}></a>
      </Flex>
      <FormHelperText fontWeight={400}>
        {t("export-ical-description")}
      </FormHelperText>
    </FormControl>
  )
}

export default ShareCalendar
