import { Icon, CalendarIcon } from "@chakra-ui/icons"
import { Flex, Button, Text } from "@chakra-ui/react"
import React, { useRef } from "react"
import { useAppContext } from "../src/SqrlContext"
// import ics from "ics"
import MeetingsFabricator from "../src/MeetingsFabricator"
import { capitalize } from "../src/utils/misc"
import { minuteOffsetToIcalArray } from "../src/utils/time"
const ics = require("ics")

const ShareCalendar = () => {
    const {
        state: { courses, userMeetings },
    } = useAppContext()

    const downloadRef = useRef<HTMLAnchorElement | null>(null)

    return (
        <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Text as="span" display="flex" alignItems="center">
                <Icon as={CalendarIcon} mr={2} /> Export as iCalendar
            </Text>
            <Button
                onClick={() => {
                    const startTimes = {
                        first: { year: 2021, month: 9, day: 9 },
                        second: { year: 2022, month: 1, day: 3 },
                    }
                    const endTimes = {
                        first: { year: 2021, month: 12, day: 8 },
                        second: { year: 2022, month: 4, day: 8 },
                    }
                    const events: Array<any> = []

                    const segregatedMeetings = {
                        first: MeetingsFabricator(
                            courses,
                            userMeetings,
                            "FIRST_SEMESTER"
                        ),
                        second: MeetingsFabricator(
                            courses,
                            userMeetings,
                            "FIRST_SEMESTER"
                        ),
                    }

                    for (const [semester, meetings] of Object.entries(
                        segregatedMeetings
                    )) {
                        const endDate = `${
                            endTimes[semester as "first" | "second"].year
                        }${endTimes[semester as "first" | "second"].month
                            .toString()
                            .padStart(2, "0")}${endTimes[
                            semester as "first" | "second"
                        ].day
                            .toString()
                            .padStart(2, "0")}T000000Z`

                        for (const meeting of meetings) {
                            events.push({
                                title: `${meeting.title} ${meeting.category
                                    .substring(0, 3)
                                    .toUpperCase()} ${meeting.section}`,
                                start: minuteOffsetToIcalArray(
                                    startTimes[semester as "first" | "second"]
                                        .year,
                                    startTimes[semester as "first" | "second"]
                                        .month,
                                    startTimes[semester as "first" | "second"]
                                        .day,
                                    meeting.startTime
                                ),
                                end: minuteOffsetToIcalArray(
                                    startTimes[semester as "first" | "second"]
                                        .year,
                                    startTimes[semester as "first" | "second"]
                                        .month,
                                    startTimes[semester as "first" | "second"]
                                        .day,
                                    meeting.endTime
                                ),
                                recurrenceRule: `FREQ=WEEKLY;BYDAY=${meeting.day
                                    .substring(0, 2)
                                    .toUpperCase()};INTERVAL=1;UNTIL=${endDate}`,
                            })
                        }
                    }

                    const { error, value } = ics.createEvents(events)

                    if (!value) return
                    if (!downloadRef.current) return

                    downloadRef.current.href =
                        "data:text/calendar;charset=utf8," + escape(value)
                    downloadRef.current.download = "Sqrl Timetable"
                    downloadRef.current.click()
                }}
            >
                Export iCalendar
            </Button>
            <a ref={downloadRef} style={{ display: "none" }}></a>
        </Flex>
    )
}

export default ShareCalendar
