import React, { Fragment } from "react"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"

interface MeetingProps {
    meeting: Meeting
    darkText?: boolean
}

const MeetingTitle = styled.div`
    padding-right: 0.3em;
    &,
    & > * {
        font-weight: 700;
        font-size: 1.2em;
        /* line-height: 2em; */
        overflow-wrap: break-word;
        text-align: left;

        white-space: pre-wrap;
        font-family: interstate-mono, monospace;

        @media print {
            font-size: 12pt;
            line-height: 10pt;
        }
    }
`

const MeetingSuffix = styled.span<{ darkText: boolean }>`
    color: ${({ darkText }) => {
        return darkText ? `#eee` : `#545454`
    }};
    font-size: 0.8em;
    font-weight: 500;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MeetingInformation = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
`

const MeetingTimes = styled.div`
    position: relative;
    top: 0.2rem;
    transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MeetingComponent = ({ meeting, darkText = true }: MeetingProps) => {
    const {
        state: { showTimeInMeeting, showCourseSuffix },
    } = usePreferences()

    const meetingTitle = meeting.title

    const firstDigitContent = meeting.title.match(/\d{3,}/g)
    let firstDigit = 0

    if (firstDigitContent)
        firstDigit = meeting.title.indexOf(firstDigitContent[0])

    const department = meetingTitle.substring(0, firstDigit)
    const numeral = firstDigitContent
        ? meetingTitle.substr(firstDigit, firstDigitContent[0].length)
        : meetingTitle

    const suffix = firstDigitContent
        ? meetingTitle.substring(
              firstDigitContent[0].length + department.length
          )
        : ""

    const startTime = minuteOffsetToTime(meeting.startTime)
    const endTime = minuteOffsetToTime(meeting.endTime)

    return (
        <MeetingInformation>
            <MeetingTitle>
                {/* <span style={{ fontSize: "inherit" }}> */}
                {department + "\u200b"}
                {/* </span>
                <span style={{ fontSize: "inherit" }}> */}
                {numeral + "\u200b"}
                {/* </span> */}
                <MeetingSuffix
                    style={{
                        opacity: showCourseSuffix ? 1 : 0,
                        display: showCourseSuffix ? "initial" : "none",
                    }}
                    darkText={darkText}
                >
                    {suffix}
                </MeetingSuffix>
            </MeetingTitle>
            <MeetingTimes
                style={{
                    opacity: showTimeInMeeting ? 1 : 0,
                }}
            >
                {startTime + "\u200b"}-{"\u200b" + endTime}
            </MeetingTimes>
        </MeetingInformation>
    )
}

export default MeetingComponent
