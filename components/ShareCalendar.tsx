import { Icon, CalendarIcon } from "@chakra-ui/icons"
import { Flex, Button, Text, FormHelperText, FormControl } from "@chakra-ui/react"
import React, { useRef } from "react"
import { useAppContext } from "../src/SqrlContext"
// import ics from "ics"
// import ical, { ICalCalendar, ICalCategory } from "ical-generator"
import MeetingsFabricator from "../src/MeetingsFabricator"
import { capitalize } from "../src/utils/misc"
import { minuteOffsetToIcalArray } from "../src/utils/time"
import icalFabricator, { dateToIcsString, SqrlIcsEvent } from "../src/utils/ics"
import { Meeting } from "./timetable/Meeting"
// const ics = require("ics")

const ShareCalendar = () => {
    const {
        state: { courses, userMeetings },
    } = useAppContext()

    const downloadRef = useRef<HTMLAnchorElement | null>(null)

    return (
    <FormControl>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
      <Text as="span" display="flex" alignItems="center">
        <Icon as={CalendarIcon} mr={2} /> Export as iCalendar
      </Text>
      <Button
        colorScheme="blue"
        bg="blue.700"
        onClick={() => {
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
            first: MeetingsFabricator(
              courses,
              userMeetings,
              "FIRST_SEMESTER"
            ),
            second: MeetingsFabricator(
              courses,
              userMeetings,
              "SECOND_SEMESTER"
            ),
          }

          for (const [semester, meetings] of Object.entries(
            segregatedMeetings
          ) as Array<["first" | "second", Meeting[]]>) {
            for (const meeting of meetings) {
              const [startHour, startMinute] =
              minuteOffsetToIcalArray(meeting.startTime)
              const [endHour, endMinute] =
              minuteOffsetToIcalArray(meeting.endTime)

              events.push({
                summary: meeting.title,
                meeting,
                firstStart: new Date(
                  Date.UTC(
                    startTimes[semester].year,
                    startTimes[semester].month - 1,
                    startTimes[semester].day,
                    startHour,
                    startMinute
                  )
                ),
                firstEnd: new Date(
                  Date.UTC(
                    startTimes[semester].year,
                    startTimes[semester].month - 1,
                    startTimes[semester].day,
                    endHour,
                    endMinute
                  )
                ),
                rruleBeforeDate: `FREQ=WEEKLY;BYDAY=${meeting.day
.substring(0, 2)
.toUpperCase()};INTERVAL=1;`,
                rruleUntil: `${dateToIcsString(
new Date(
Date.UTC(
endTimes[semester].year,
endTimes[semester].month - 1,
endTimes[semester].day + 1
)
)
)}`,
                tzid: `America/Toronto`,
              })
            }
          }

          // if (!value) return
          if (!downloadRef.current) return

          downloadRef.current.href =
            "data:text/calendar;charset=utf8," +
              escape(icalFabricator(events))
          downloadRef.current.download = "SqrlTimetable"
          downloadRef.current.click()
        }}
      >
        Download .ics file
      </Button>
      <a ref={downloadRef} style={{ display: "none" }}></a>
    </Flex>
      <FormHelperText fontWeight={400}>
        Holidays, semester start and end dates may be inaccurate.
      </FormHelperText>

    </FormControl>
    )
}

export default ShareCalendar
