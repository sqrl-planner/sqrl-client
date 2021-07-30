import { Tooltip } from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"

interface MeetingProps {
    meeting: Meeting
    darkText?: boolean
    twentyFour: boolean
}

const deliveryAbbreviations = {
    "online asynchronous": "OA",
    "online synchronous": "OS",
    "in person": "IP",
}

const categoryAbbreviations = {
    tutorial: "TUT",
    lecture: "LEC",
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const MeetingTitle = styled.div`
    padding-right: 0.3em;
    line-height: 1.2em;
    &,
    & > * {
        font-weight: 700;
        font-size: 1.2em;
        /* line-height: 2em; */
        /* overflow-wrap: break-word; */
        /* word-wrap: break-word; */
        text-align: left;

        /* white-space: pre-wrap; */
        font-family: interstate-mono, monospace;

        @media print {
            font-size: 12pt;
            line-height: 10pt;
        }
    }
`

const MeetingSuffix = styled.span<{ darkText: boolean }>`
    /* opacity: 0; */
    font-size: 0.8em;
    font-weight: 500;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MeetingInformation = styled.div<{ darkText: boolean }>`
    color: ${({ darkText }) => {
        return darkText ? `#111` : `#eee`
    }};
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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
    top: 0.1rem;
    font-size: 0.9em;
    opacity: 0.8;
    transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MeetingDelivery = styled.div`
    /* font-size: 0.9em; */
    /* font-weight: 700; */
    /* position: relative; */
    /* top: 0.2rem; */
`

const MeetingCategory = styled.div`
    /* font-size: 0.9em; */
    /* font-weight: 700; */
`

const MiscInfo = styled.div`
    font-family: interstate-mono, monospace;
    font-weight: 700;
    font-size: 0.9em;

    position: absolute;
    bottom: 0.4rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.2em;
    opacity: 0.6;
`

const MeetingComponent = ({
    meeting,
    darkText = true,
    twentyFour,
}: MeetingProps) => {
    const {
        state: {
            showTimeInMeeting,
            showCourseSuffix,
            showCategory,
            showDelivery,
        },
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

    const startTime = minuteOffsetToTime(meeting.startTime, twentyFour)
    const endTime = minuteOffsetToTime(meeting.endTime, twentyFour)

    return (
        <MeetingInformation darkText={darkText}>
            <MeetingTitle>
                {/* <span style={{ fontSize: "inherit" }}> */}
                {department + "\u200b"}
                {/* </span>
                <span style={{ fontSize: "inherit" }}> */}
                {numeral + "\u200b"}
                {/* </span> */}
                <MeetingSuffix
                    style={{
                        opacity: showCourseSuffix ? "" : 0,
                        display: showCourseSuffix ? "initial" : "none",
                    }}
                    darkText={darkText}
                >
                    {suffix}
                </MeetingSuffix>
            </MeetingTitle>
            <MeetingTimes
                style={{
                    opacity: showTimeInMeeting ? "" : 0,
                }}
            >
                {startTime + "\u200b"}-{"\u200b" + endTime}
            </MeetingTimes>
            <MiscInfo>
                {showDelivery && (
                    <Tooltip hasArrow label={`${capitalize(meeting.delivery)}`}>
                        <MeetingDelivery style={{ cursor: "default" }}>
                            {deliveryAbbreviations[meeting.delivery]}
                        </MeetingDelivery>
                    </Tooltip>
                )}

                {showCategory && (
                    <Tooltip
                        hasArrow
                        label={
                            meeting.section
                                ? `${capitalize(meeting.category)} section ${
                                      meeting.section
                                  }`
                                : `${capitalize(meeting.category)}`
                        }
                    >
                        <MeetingCategory style={{ cursor: "default" }}>
                            {categoryAbbreviations[meeting.category]}
                            {meeting.section}
                        </MeetingCategory>
                    </Tooltip>
                )}
            </MiscInfo>
        </MeetingInformation>
    )
}

export default MeetingComponent
