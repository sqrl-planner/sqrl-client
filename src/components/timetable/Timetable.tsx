import { Flex, Tooltip, useToast } from "@chakra-ui/react"
import React, { FunctionComponent, useEffect, useState } from "react"
import { Day, minuteOffsetToTime, timeToMinuteOffset } from "../../utils/time"
import ConflictMeeting from "./ConflictMeeting"
import { Meeting, MeetingGroup } from "./Meeting"
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
    StyledTr
} from "./StyledTimetable"

type TimetableProps = {
    /**
     * The meetings to display on the timetable.
     */
    meetings: Meeting[];
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
    meetings,
    minTime = timeToMinuteOffset(8),
    maxTime = timeToMinuteOffset(22),
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
    console.log(groupsByDay)

    const tableRows: Array<React.ReactNode> = []
    for (let currentTime = minTime; currentTime <= maxTime; currentTime += resolution) {
        const timeLabel = minuteOffsetToTime(currentTime)
        const cells = [
            <StyledTimeLabelTd className="time">{timeLabel}</StyledTimeLabelTd>,
        ]

        for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
            let isOccupied = false
            for (const group of groupsByDay.get(DAYS[dayIndex])) {
                const groupStartTime = group.getMinStartTime()
                const groupEndTime = group.getMaxEndTime()
                if (groupStartTime <= currentTime && currentTime < groupEndTime) {
                    isOccupied = true
                    console.log(`${DAYS[dayIndex]} - ${minuteOffsetToTime(currentTime)} (${currentTime})`, group)
                }

                if (groupStartTime !== currentTime)
                    continue
                
                if (group.meetings.length === 1) {
                    // No conflicts
                    const meeting = group.meetings[0]
                    const rowspan = Math.ceil(
                        (meeting.endTime - meeting.startTime) / resolution
                    )
                    const startTime = minuteOffsetToTime(
                        meeting.startTime
                    )
                    const endTime = minuteOffsetToTime(
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
                } else {
                    // Conflicts
                    const rowspan = Math.ceil(
                        (groupEndTime - groupStartTime) / resolution
                    )
                    const percent = 100 / group.meetings.length

                    const items: Array<React.ReactNode> = []
                    group.meetings.forEach(
                        (meeting: Meeting, index: number) => {
                            const height =
                                ((meeting.endTime - meeting.startTime) /
                                    (groupEndTime - groupStartTime)) *
                                100

                            const startTime = minuteOffsetToTime(
                                meeting.startTime
                            )
                            const endTime = minuteOffsetToTime(
                                meeting.endTime
                            )

                            items.push(
                                <ConflictMeeting
                                    meeting={meeting}
                                    percent={percent}
                                    startTime={startTime}
                                    endTime={endTime}
                                    gapStartTime={groupStartTime}
                                    gapEndTime={groupEndTime}
                                    index={index}
                                    key={index}
                                    height={height}
                                />
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
                break
            }

            if (!isOccupied) {
                console.log(`${DAYS[dayIndex]} - ${minuteOffsetToTime(currentTime)}: empty`)
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
