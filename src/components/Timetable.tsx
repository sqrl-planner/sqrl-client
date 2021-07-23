import { Box, Flex, Tooltip, useToast } from "@chakra-ui/react"
import React, { FunctionComponent, useEffect, useState } from "react"
import { Day, Meeting, meetings } from "./Meeting"
import {
    MeetingTime,
    MeetingTimeCell,
    MeetingTitle,
    StyledHead,
    StyledTbody,
    StyledTh,
    StyledTimeLabelTd,
    StyledTimetable,
    StyledTimetableContainer,
    StyledTr,
} from "./StyledTimetable"

type TimetableProps = {
    // meetings: Meeting[];
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
}

export const Timetable: FunctionComponent<TimetableProps> = ({
    minTime = Meeting.timeToMinuteOffset(8),
    maxTime = Meeting.timeToMinuteOffset(22),
    resolution = 15,
}) => {
    const [size, setSize] = useState(1)

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

    const grid: Array<any> = []
    for (let i = 0; i <= (maxTime - minTime) / resolution; i++) {
        grid.push(Array.apply(null, Array(DAYS.length)).map(() => []))
    }

    // Compute grid
    for (const meeting of meetings) {
        const dayIndex = DAYS.indexOf(meeting.day)
        for (
            let currentTime = Math.max(meeting.startTime, minTime);
            currentTime < Math.min(meeting.endTime, maxTime);
            currentTime += resolution
        ) {
            const timeIndex = Math.floor((currentTime - minTime) / resolution)
            grid[timeIndex][dayIndex].push(meeting)
        }
    }

    // Compute conflicts
    const conflicts = new Map()
    for (const meeting of meetings) {
        const dayIndex = DAYS.indexOf(meeting.day)
        let timeIndex = Math.floor((meeting.startTime - minTime) / resolution)
        const currentConflicts = new Set()
        while (grid[timeIndex][dayIndex].indexOf(meeting) !== -1) {
            for (const x of grid[timeIndex][dayIndex]) {
                if (x !== meeting) {
                    currentConflicts.add(x)
                }
            }
            timeIndex += 1
        }
        if (currentConflicts.size > 0) {
            conflicts.set(meeting, currentConflicts)
        }
    }

    const meetingsByDay = new Map()
    for (const meeting of meetings) {
        if (!meetingsByDay.has(meeting.day)) {
            meetingsByDay.set(meeting.day, [])
        }
        meetingsByDay.get(meeting.day).push(meeting)
    }

    const gapsByDay = new Map()
    for (const key of Array.from(meetingsByDay.keys())) {
        const meetingsToday = meetingsByDay.get(key)
        // Make sure there is at least one meeting!
        if (meetingsToday.length === 0) continue
        // Sort in increasing order of start time
        meetingsToday.sort((a: any, b: any) =>
            a.startTime >= b.startTime ? 1 : -1
        )
        // Merge overlapping meetings
        const meetingStack = [
            [meetingsToday[0].getTimeBounds(), [meetingsToday[0]]],
        ]
        for (let i = 1; i < meetingsToday.length; i++) {
            const top = meetingStack[meetingStack.length - 1]
            if (top[0][1] <= meetingsToday[i].startTime) {
                meetingStack.push([
                    meetingsToday[i].getTimeBounds(),
                    [meetingsToday[i]],
                ])
            } else if (top[0][1] < meetingsToday[i].endTime) {
                top[0][1] = meetingsToday[i].endTime
                top[1].push(meetingsToday[i])
                meetingStack.pop()
                meetingStack.push(top)
            } else {
                top[1].push(meetingsToday[i])
            }
        }
        gapsByDay.set(key, meetingStack)
    }
    console.log(gapsByDay)

    const tableRows: Array<React.ReactNode> = []
    for (let timeIndex = 0; timeIndex < grid.length; timeIndex++) {
        const currentTime = minTime + timeIndex * resolution
        const timeLabel = Meeting.minuteOffsetToTime(currentTime)
        const cells = [
            <StyledTimeLabelTd className="time">{timeLabel}</StyledTimeLabelTd>,
        ]

        for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
            const meetingsAtThisTime = grid[timeIndex][dayIndex]
            if (meetingsAtThisTime.length > 0) {
                for (const meeting of meetingsAtThisTime) {
                    if (!conflicts.has(meeting)) {
                        // Case A: No conflicts
                        if (meeting.startTime !== currentTime) continue
                        const rowspan = Math.ceil(
                            (meeting.endTime - meeting.startTime) / resolution
                        )
                        const startTime = Meeting.minuteOffsetToTime(
                            meeting.startTime
                        )
                        const endTime = Meeting.minuteOffsetToTime(
                            meeting.endTime
                        )
                        cells.push(
                            <MeetingTimeCell
                                days={DAYS.length}
                                rowSpan={rowspan}
                            >
                                <Tooltip
                                    hasArrow
                                    label={`${meeting.title}: ${startTime}-${endTime}`}
                                    fontSize="1.4rem"
                                >
                                    <MeetingTime meeting={meeting.title}>
                                        <MeetingTitle>
                                            {meeting.title}{" "}
                                        </MeetingTitle>
                                        <span
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {startTime}
                                        </span>
                                        -
                                        <span
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {endTime}
                                        </span>
                                    </MeetingTime>
                                </Tooltip>
                            </MeetingTimeCell>
                        )
                    }
                }
                const day = DAYS[dayIndex]
                if (gapsByDay.has(day)) {
                    for (const gap of gapsByDay.get(day)) {
                        if (gap[0][0] !== currentTime || gap[1].length === 1)
                            continue
                        const gapStartTime = gap[0][0],
                            gapEndTime = gap[0][1]
                        const rowspan = Math.ceil(
                            (gapEndTime - gapStartTime) / resolution
                        )
                        const allMeetings = gap[1]

                        const items: Array<React.ReactNode> = []
                        allMeetings.forEach(
                            (meeting: Meeting, index: number) => {
                                const height =
                                    ((meeting.endTime - meeting.startTime) /
                                        (gapEndTime - gapStartTime)) *
                                    100

                                const percent = 100 / allMeetings.length

                                const startTime = Meeting.minuteOffsetToTime(
                                    meeting.startTime
                                )
                                const endTime = Meeting.minuteOffsetToTime(
                                    meeting.endTime
                                )

                                items.push(
                                    <Tooltip
                                        hasArrow
                                        label={`${meeting.title}: ${startTime}-${endTime}`}
                                        fontSize="1.4rem"
                                    >
                                        <Box
                                            key={index}
                                            position="absolute"
                                            width={`calc(${percent}% - 0.4rem)`}
                                            height={`calc(${height}% - 0.1rem)`}
                                            left={`calc(${
                                                index * percent
                                            }% + 0.4rem)`}
                                            top={`calc(${
                                                ((meeting.startTime -
                                                    gapStartTime) /
                                                    (gapEndTime -
                                                        gapStartTime)) *
                                                100
                                            }% + 0.2rem)`}
                                            p={"0.8rem"}
                                            boxShadow="1px 1px 4px -2px rgba(0, 0, 0, 0.4)"
                                            bg="red.700"
                                            color="#fff"
                                            fontWeight="600"
                                            wordBreak="keep-all"
                                            // whiteSpace="nowrap"
                                            overflow="hidden"
                                            textOverflow="ellipsis"
                                        >
                                            <MeetingTitle>
                                                {meeting.title}{" "}
                                            </MeetingTitle>
                                            <span
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {Meeting.minuteOffsetToTime(
                                                    meeting.startTime
                                                )}
                                            </span>
                                            -
                                            <span
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {Meeting.minuteOffsetToTime(
                                                    meeting.endTime
                                                )}
                                            </span>
                                        </Box>
                                    </Tooltip>
                                )
                            }
                        )
                        cells.push(
                            <MeetingTimeCell
                                days={DAYS.length}
                                rowSpan={rowspan}
                            >
                                <Flex>{items}</Flex>
                            </MeetingTimeCell>
                        )
                    }
                }
            } else {
                cells.push(<MeetingTimeCell days={DAYS.length} />)
            }
        }
        tableRows.push(
            <StyledTr size={size} resolution={resolution}>
                {cells}
            </StyledTr>
        )
    }

    const toast = useToast()

    useEffect(() => {
        if (Math.random() < 0.2) toast({ title: "nut", status: "success" })
    }, [toast])

    return (
        <StyledTimetableContainer>
            <input
                type="range"
                min="20"
                max="100"
                value={size}
                onChange={(e: any) => setSize(e.target.value)}
            />
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
