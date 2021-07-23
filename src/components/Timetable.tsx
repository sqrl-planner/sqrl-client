import { useToast } from "@chakra-ui/react"
import React, { FunctionComponent, useEffect } from "react"
import { Day, Meeting, meetings } from "./Meeting"
import {
    MeetingTime,
    MeetingTimeCell,
    StyledHead,
    StyledTbody,
    StyledTh,
    StyledTimeLabelTd,
    StyledTimetable,
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
    // TODO: Ensure that 0 < resolution <= 60

    // For now, let's only support week days! Fuck the kids who want to do classes on the weekends.
    const DAYS = [
        Day.MONDAY,
        Day.TUESDAY,
        Day.WEDNESDAY,
        Day.THURSDAY,
        Day.FRIDAY,
    ]
    const tableRows: Array<any> = []
    const occupiedTimes = new Map()
    for (
        let currentTime = minTime;
        currentTime <= maxTime;
        currentTime += resolution
    ) {
        // Find all meetings that start on/near the current time
        // Map meetings AT the current time by day
        const meetingsRightNowByDay = new Map()
        for (const meeting of meetings) {
            if (meeting.startTime !== currentTime) continue
            if (!meetingsRightNowByDay.has(meeting.day)) {
                meetingsRightNowByDay.set(meeting.day, [])
            }
            meetingsRightNowByDay.get(meeting.day).push(meeting)
        }

        const hour = Math.floor(currentTime / 60)
        const minute = currentTime % 60
        const timeLabel =
            hour.toString().padStart(2, "0") +
            ":" +
            minute.toString().padStart(2, "0")
        // const cells = [
        //     minute === 0 ? (
        //         <StyledTimeLabelTd>{timeLabel}</StyledTimeLabelTd>
        //     ) : (
        //         <StyledTimeLabelTd />
        //     ),
        // ]
        const cells = [
            <StyledTimeLabelTd className="time">{timeLabel}</StyledTimeLabelTd>,
        ]
        for (const day of DAYS) {
            // Initialize occupied times
            if (!occupiedTimes.has(day)) {
                occupiedTimes.set(day, new Set())
            }
            // Check for meeting
            const hasMeetings =
                meetingsRightNowByDay.has(day) &&
                meetingsRightNowByDay.get(day).length > 0
            if (hasMeetings) {
                // Compute rowspan lmao
                // Assume there is only one meeting for now
                const meeting = meetingsRightNowByDay.get(day)[0]
                const rowspan = Math.ceil(
                    (meeting.endTime - meeting.startTime) / resolution
                )
                cells.push(
                    <MeetingTimeCell days={DAYS.length} rowSpan={rowspan}>
                        <MeetingTime>{meeting.title}</MeetingTime>
                    </MeetingTimeCell>
                )
                // Update occupied times
                for (
                    let occupiedTime = meeting.startTime;
                    occupiedTime < meeting.endTime;
                    occupiedTime += resolution
                ) {
                    occupiedTimes.get(meeting.day).add(occupiedTime)
                }
            } else if (!occupiedTimes.get(day).has(currentTime)) {
                cells.push(<MeetingTimeCell days={DAYS.length} />)
            }
        }
        tableRows.push(<StyledTr resolution={resolution}>{cells}</StyledTr>)
    }

    const toast = useToast()

    useEffect(() => {
        if (Math.random() < 0.2) toast({ title: "nut" })
    }, [toast])

    return (
        <StyledTimetable>
            <StyledHead>
                <StyledTh></StyledTh>
                {DAYS.map((day) => (
                    <StyledTh>{day.toString().substr(0, 3)}</StyledTh>
                ))}
            </StyledHead>
            <StyledTbody>{tableRows}</StyledTbody>
        </StyledTimetable>
    )
}
