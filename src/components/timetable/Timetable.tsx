import { Button, Flex, useToast } from "@chakra-ui/react"
import React, { FunctionComponent, useEffect, useState } from "react"
import { usePreferences } from "../../PreferencesContext"
import { Day, minuteOffsetToTime, timeToMinuteOffset } from "../../utils/time"
import { Meeting, MeetingGroup } from "./Meeting"
import MeetingComponent from "./MeetingComponent"
import {
    MeetingTime,
    MeetingTimeCell,
    StyledHead,
    StyledTbody,
    StyledTh,
    StyledTimeLabelTd,
    StyledTimetable,
    StyledTimetableContainer,
    StyledTr,
} from "./StyledTimetable"

type TimetableProps = {
    /**
     * The meetings to display on the timetable.
     */
    meetings: Meeting[]
    /**
     * The earliest time displayed on the timetable, given in minutes offset from midnight.
     */
    minTime?: number
    /**
     * The latest time displayed on the timetable, given in minutes offset from midnight.
     */
    maxTime?: number
    /**
     * The minute resolution of the timetable (in the range (0, 60]).
     */
    resolution?: number
    /**
     * The scale of the timetable
     */
    scale?: number
    /**
     * The palette of the timetable
     */
    palette?: string
}

export const Timetable: FunctionComponent<TimetableProps> = ({
    meetings,
    minTime = timeToMinuteOffset(8),
    maxTime = timeToMinuteOffset(22),
    resolution = 15,
    scale = 48,
    palette = "default",
}) => {
    // TODO: Ensure 0 < minTime < maxTime <= 60 * 24
    // TODO: Ensure that 0 < resolution <= 60

    // For now, let's only support week days! Fuck the kids who want to do classes on the weekends.
    const DAYS = [
        Day.MONDAY,
        Day.TUESDAY,
        Day.WEDNESDAY,
        Day.THURSDAY,
        Day.FRIDAY,
    ]

    const meetingsByDay = new Map()
    for (const meeting of meetings) {
        if (!meetingsByDay.has(meeting.day)) {
            meetingsByDay.set(meeting.day, [])
        }
        meetingsByDay.get(meeting.day).push(meeting)
    }

    const groupsByDay = new Map()
    for (const day of DAYS) {
        if (meetingsByDay.has(day)) {
            groupsByDay.set(day, MeetingGroup.partition(meetingsByDay.get(day)))
        } else {
            groupsByDay.set(day, [])
        }
    }
    // console.log(groupsByDay)

    const tableRows: Array<React.ReactNode> = []
    for (
        let currentTime = minTime;
        currentTime <= maxTime;
        currentTime += resolution
    ) {
        const timeLabel = minuteOffsetToTime(currentTime)
        const cells = [
            <StyledTimeLabelTd className="time">{timeLabel}</StyledTimeLabelTd>,
        ]

        for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
            let isOccupied = false
            for (const group of groupsByDay.get(DAYS[dayIndex])) {
                const groupStartTime = group.getMinStartTime()
                const groupEndTime = group.getMaxEndTime()
                if (
                    groupStartTime <= currentTime &&
                    currentTime < groupEndTime
                ) {
                    isOccupied = true
                    // console.log(
                    //     `${DAYS[dayIndex]} - ${minuteOffsetToTime(
                    //         currentTime
                    //     )} (${currentTime})`,
                    //     group
                    // )
                }

                const rowspan = Math.ceil(
                    (groupEndTime - groupStartTime) / resolution
                )

                if (groupStartTime !== currentTime) continue

                if (group.meetings.length === 1) {
                    // No conflicts
                    const meeting = group.meetings[0]
                    cells.push(
                        <MeetingTimeCell days={DAYS.length} rowSpan={rowspan}>
                            <MeetingTime
                                courseKey={meeting.courseKey}
                                palette={palette}
                            >
                                <MeetingComponent
                                    plural={false}
                                    meeting={meeting}
                                />
                            </MeetingTime>
                        </MeetingTimeCell>
                    )
                } else {
                    // Conflicts
                    const percent = 100 / group.meetings.length

                    const items: Array<React.ReactNode> = []
                    group.meetings.forEach(
                        (meeting: Meeting, index: number) => {
                            const height =
                                ((meeting.endTime - meeting.startTime) /
                                    (groupEndTime - groupStartTime)) *
                                100

                            items.push(
                                <MeetingTime
                                    style={{
                                        position: "absolute",
                                        width: `calc(${percent}% - 0.4rem)`,
                                        height: `calc(${height}% - 0.1rem)`,
                                        left: `calc(${
                                            index * percent
                                        }% + 0.3rem)`,
                                        // top position is percent of meeting starttime of group starttime
                                        top: `calc(${
                                            ((meeting.startTime -
                                                groupStartTime) /
                                                (groupEndTime -
                                                    groupStartTime)) *
                                            100
                                        }% + 0.2rem)`,
                                        backgroundColor: "#c53030",
                                        border: "1px solid #c53030",
                                        color: "#fff",
                                    }}
                                    courseKey={meeting.courseKey}
                                    palette={palette}
                                >
                                    <MeetingComponent
                                        plural={true}
                                        meeting={meeting}
                                    />
                                </MeetingTime>
                            )
                        }
                    )
                    cells.push(
                        <MeetingTimeCell days={DAYS.length} rowSpan={rowspan}>
                            <Flex>{items}</Flex>
                        </MeetingTimeCell>
                    )
                }
                break
            }

            if (!isOccupied) {
                // console.log(
                //     `${DAYS[dayIndex]} - ${minuteOffsetToTime(
                //         currentTime
                //     )}: empty`
                // )
                cells.push(<MeetingTimeCell days={DAYS.length} />)
            }
        }
        tableRows.push(
            <StyledTr size={scale} resolution={resolution}>
                {cells}
            </StyledTr>
        )
    }

    return (
        <StyledTimetableContainer>
            <StyledTimetable>
                <thead>
                    <StyledHead>
                        <StyledTh></StyledTh>
                        {DAYS.map((day) => (
                            // <StyledTh>{day.toString().substr(0, 3)}</StyledTh>
                            <StyledTh>{day}</StyledTh>
                        ))}
                    </StyledHead>
                </thead>
                <StyledTbody>{tableRows}</StyledTbody>
            </StyledTimetable>
        </StyledTimetableContainer>
    )
}

// yellow dog
