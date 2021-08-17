import { Meeting } from "../../components/timetable/Meeting"
import { v4 as uuidv4 } from "uuid"

export interface SqrlIcsEvent {
    summary: string
    firstStart: Date
    firstEnd: Date
    rruleBeforeDate: string
    rruleUntil: string
    tzid: string
    meeting: Meeting
}

const HEADER = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:eamonma/ics`

const generateUid = async (meeting: Meeting) => {
    return Array.from(
        new Uint8Array(
            await crypto.subtle.digest(
                "SHA-256",
                new TextEncoder().encode(
                    `${meeting.getUniqueKey()}-${meeting.day}`
                )
            )
        )
    )
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
}

const ISOStringToDateString = (ISOString: string): string => {
    return ISOString.replace(/[^a-zA-Z0-9 ]/g, "").substring(
        0,
        ISOString.length - 9
    )
}

export const dateToIcsString = (date: Date): string =>
    ISOStringToDateString(date.toISOString())

const icalFabricator = (events: Array<SqrlIcsEvent>): string => {
    let ics = ""

    ics += HEADER

    const currentTimeStamp = dateToIcsString(new Date())

    for (const event of events) {
        ics += `
BEGIN:VEVENT
UID:${uuidv4()}
SUMMARY:${event.summary}
DTSTAMP:${currentTimeStamp}Z
DTSTART;TZID=${event.tzid}:${dateToIcsString(event.firstStart)}
DTEND;TZID=${event.tzid}:${dateToIcsString(event.firstEnd)}
RRULE:${event.rruleBeforeDate}UNTIL=${event.rruleUntil}
END:VEVENT`
    }

    ics += `
END:VCALENDAR`

    return ics
}

export default icalFabricator
