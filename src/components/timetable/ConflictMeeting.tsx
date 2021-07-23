import { Box, Tooltip } from "@chakra-ui/react"
import React from "react"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"
import {
    MeetingTitle
} from "./StyledTimetable"

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
            <Box
                position="absolute"
                width={`calc(${percent}% - 0.4rem)`}
                height={`calc(${height}% - 0.1rem)`}
                left={`calc(${index * percent}% + 0.4rem)`}
                top={`calc(${
                    ((meeting.startTime - gapStartTime) /
                        (gapEndTime - gapStartTime)) *
                    100
                }% + 0.3rem)`}
                p={"0.8rem"}
                boxShadow="1px 1px 4px -2px rgba(0, 0, 0, 0.4)"
                bg="red.600"
                color="#fff"
                fontWeight="600"
                wordBreak="keep-all"
                // whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
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
            </Box>
        </Tooltip>
    )
}

export default ConflictMeeting
