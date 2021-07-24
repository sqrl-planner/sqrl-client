import React, { Fragment } from "react"
import { minuteOffsetToTime } from "../../utils/time"
import { Meeting } from "./Meeting"
import { MeetingDepartment, MeetingTitle } from "./StyledTimetable"

interface MeetingProps {
    meeting: Meeting
}

const MeetingComponent = ({ meeting }: MeetingProps) => {
    console.log("type:::::" + typeof meeting.title)

    const meetingTitle = meeting.title

    const firstDigitContent = meeting.title.match(/\d/)
    let firstDigit = 0

    if (firstDigitContent)
        firstDigit = meeting.title.indexOf(firstDigitContent[0])

    const department = meetingTitle.substring(0, firstDigit)
    const numeral = meetingTitle.substring(firstDigit)

    const startTime = minuteOffsetToTime(meeting.startTime)
    const endTime = minuteOffsetToTime(meeting.endTime)

    return (
        <Fragment>
            <MeetingTitle>
                <MeetingDepartment>{department}</MeetingDepartment>
                {numeral}
            </MeetingTitle>
            <div>
                {startTime}-{endTime}
            </div>
        </Fragment>
    )
}

export default MeetingComponent
