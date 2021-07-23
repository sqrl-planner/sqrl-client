import { Box, Tooltip } from "@chakra-ui/react"
import React from "react"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"
import { MeetingTime, MeetingTitle } from "./StyledTimetable"

interface ConflictMeetingProps {
    meeting: Meeting
    startTime: string
    endTime: string
    percent: number
    gapStartTime: number
    gapEndTime: number
    index: number
    height: number
}

export const ConflictMeeting = ({
    meeting,
    startTime,
    endTime,
    percent,
    gapStartTime,
    gapEndTime,
    index,
    height,
}: ConflictMeetingProps) => {
    return (
        <Tooltip
            hasArrow
            label={`${meeting.title}: ${startTime}-${endTime}`}
            fontSize="1.4rem"
        >
            <MeetingTime
                style={{
                    position: "absolute",
                    width: `calc(${percent}% - 0.4rem)`,
                    height: `calc(${height}% - 0.1rem)`,
                    left: `calc(${index * percent}% + 0.4rem)`,
                    top: `calc(${
                        ((meeting.startTime - gapStartTime) /
                            (gapEndTime - gapStartTime)) *
                        100
                    }% + 0.3rem)`,
                    backgroundColor: "#c53030",
                    border: "1px solid #c53030",
                    color: "#fff",
                }}
                meeting={meeting.title}
            >
                <MeetingTitle>{meeting.title} </MeetingTitle>
                <span
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    {minuteOffsetToTime(meeting.startTime)}
                </span>
                -
                <span
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    {minuteOffsetToTime(meeting.endTime)}
                </span>
            </MeetingTime>
        </Tooltip>
    )
}

export default ConflictMeeting
