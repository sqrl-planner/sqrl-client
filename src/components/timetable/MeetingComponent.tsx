import React, { Fragment } from "react"
import styled from "styled-components"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"

interface MeetingProps {
    meeting: Meeting
    plural: boolean
}

const MeetingTitle = styled.div`
    padding-right: 0.5rem;
    &,
    & > * {
        font-weight: 700;
        font-size: 1.5rem;
        font-family: monospace;

        @media print {
            font-size: 12pt;
            line-height: 10pt;
        }
    }
`

const MeetingSuffix = styled.span<{ plural: boolean }>`
    color: ${({ plural }) => {
        return plural ? `#eee` : `#545454`
    }};
    font-size: 1.2rem;
    font-weight: 500;
`

const MeetingInformation = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    /* align-items: baseline; */
    justify-content: center;
    flex-wrap: wrap;

    width: 100%;
    height: auto;
    /* font-size: 1.2rem;
    font-weight: 500; */
    /* line-height: 2.4rem; */
    /* display: flex;
    width: 100%;
    flex-direction: column;
    align-content: flex-start;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap; */
`

const MeetingComponent = ({ meeting, plural }: MeetingProps) => {
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
                {department + "\u200b"}
                {numeral + "\u200b"}
                <MeetingSuffix plural={plural}>{suffix}</MeetingSuffix>
            </MeetingTitle>
            {startTime + "\u200b"}-{"\u200b" + endTime}
        </MeetingInformation>
    )
}

export default MeetingComponent
