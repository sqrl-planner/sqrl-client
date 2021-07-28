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
    /**
     * Whether to highlight conflicts
     */
    highlightConflicts?: boolean
    /**
     * Clock: 12 or 24?
     */
    twentyFour?: boolean
    /**
     * Dark mode
     */
    dark?: boolean
}

export const Timetable: FunctionComponent<TimetableProps> = ({
    meetings,
    minTime = timeToMinuteOffset(8),
    maxTime = timeToMinuteOffset(22),
    resolution = 15,
    scale = 45,
    palette = "default",
    highlightConflicts = true,
    twentyFour = true,
    dark = false,
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

    const tableRows: Array<React.ReactNode> = []
    for (
        let currentTime = minTime;
        currentTime <= maxTime;
        currentTime += resolution
    ) {
        const timeLabel = minuteOffsetToTime(currentTime, twentyFour)
        const cells = [
            <StyledTimeLabelTd key={currentTime} className="time">
                {timeLabel}
            </StyledTimeLabelTd>,
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
                }

                const rowspan = Math.ceil(
                    (groupEndTime - groupStartTime) / resolution
                )

                if (groupStartTime !== currentTime) continue

                if (group.meetings.length === 1) {
                    // No conflicts
                    const meeting = group.meetings[0]
                    cells.push(
                        <MeetingTimeCell
                            key={dayIndex}
                            days={DAYS.length}
                            rowSpan={rowspan}
                            dark={dark}
                        >
                            <MeetingTime
                                courseKey={meeting.courseKey}
                                palette={palette}
                                dark={dark}
                            >
                                <MeetingComponent
                                    darkText={!dark}
                                    meeting={meeting}
                                    twentyFour={twentyFour}
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
                                    key={index}
                                    style={{
                                        position: "absolute",
                                        width: `calc(${percent}% - 0.4em)`,
                                        height: `calc(${height}% - 0.2em)`,
                                        left: `calc(${index * percent}% + ${
                                            !index ? "0.3em" : "0.1em"
                                        })`,
                                        // top position is percent of meeting starttime of group starttime
                                        top: `calc(${
                                            ((meeting.startTime -
                                                groupStartTime) /
                                                (groupEndTime -
                                                    groupStartTime)) *
                                            100
                                        }% + 0.2em)`,
                                        backgroundColor: highlightConflicts
                                            ? "#c53030"
                                            : "",
                                        // border: highlightConflicts
                                        //     ? "1px solid #c53030"
                                        //     : "",
                                        color: highlightConflicts ? "#fff" : "",
                                        transition:
                                            "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                                    }}
                                    courseKey={meeting.courseKey}
                                    palette={palette}
                                    dark={dark}
                                >
                                    <MeetingComponent
                                        darkText={!(dark || highlightConflicts)}
                                        meeting={meeting}
                                        twentyFour={twentyFour}
                                    />
                                </MeetingTime>
                            )
                        }
                    )
                    cells.push(
                        <MeetingTimeCell
                            key={dayIndex}
                            days={DAYS.length}
                            rowSpan={rowspan}
                            dark={dark}
                        >
                            <Flex>{items}</Flex>
                        </MeetingTimeCell>
                    )
                }
                break
            }

            if (!isOccupied) {
                cells.push(
                    <MeetingTimeCell
                        key={dayIndex}
                        days={DAYS.length}
                        dark={dark}
                    />
                )
            }
        }
        tableRows.push(
            <StyledTr
                key={currentTime}
                size={scale}
                resolution={resolution}
                dark={dark}
            >
                {cells}
            </StyledTr>
        )
    }

    return (
        <StyledTimetableContainer>
            <StyledTimetable>
                <thead>
                    <StyledHead>
                        <StyledTh dark={dark}></StyledTh>
                        {DAYS.map((day, index) => (
                            <StyledTh key={index} dark={dark}>
                                {day.toString().substr(0, 3)}
                            </StyledTh>
                            // <StyledTh>{day}</StyledTh>
                        ))}
                    </StyledHead>
                </thead>
                <StyledTbody>{tableRows}</StyledTbody>
            </StyledTimetable>
        </StyledTimetableContainer>
    )
}

// yellow dog
