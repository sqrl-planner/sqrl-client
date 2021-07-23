import { Day, timeToMinuteOffset } from "../../utils/time"

/**
 * A class representing a single meeting on the timetable.
 */
export class Meeting {
    /**
     * The title of the meeting.
     */
    title: string
    /**
     * The day of the meeting.
     */
    day: Day
    /**
     * The start time of the meeting, given in minutes from midnight.
     */
    startTime: number
    /**
     * The end time of the meeting, given in minutes from midnight.
     */
    endTime: number

    constructor(
        day: Day,
        startTime: number,
        endTime: number,
        title: string = "Untitled meeting"
    ) {
        this.day = day
        this.startTime = startTime
        this.endTime = endTime
        this.title = title
    }

    /**
     * Get the time bounds of this meeting.
     * @returns An array containing two numbers: the start and end time.
     */
    getTimeBounds(): [number, number] {
        return [this.startTime, this.endTime]
    }
}

/**
 * Example data of meetings for testing the timetable.
 */
export const EXAMPLE_MEETINGS = [
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(10),
        timeToMinuteOffset(11),
        "CSC258"
    ),
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(11),
        timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(12),
        timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(13),
        timeToMinuteOffset(14),
        "Fake course"
    ),
    // begin conflicting time
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(14),
        timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.MONDAY,
        timeToMinuteOffset(15),
        timeToMinuteOffset(17),
        "STA247"
    ),
    // end conflicting time
    new Meeting(
        Day.TUESDAY,
        timeToMinuteOffset(11),
        timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.TUESDAY,
        timeToMinuteOffset(12),
        timeToMinuteOffset(13),
        "MAT237"
    ),
    new Meeting(
        Day.TUESDAY,
        timeToMinuteOffset(15),
        timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.TUESDAY,
        timeToMinuteOffset(18),
        timeToMinuteOffset(21),
        "CSC258"
    ),
    new Meeting(
        Day.WEDNESDAY,
        timeToMinuteOffset(10),
        timeToMinuteOffset(11),
        "CSC258"
    ),
    new Meeting(
        Day.WEDNESDAY,
        timeToMinuteOffset(12),
        timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.THURSDAY,
        timeToMinuteOffset(11),
        timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.THURSDAY,
        timeToMinuteOffset(15),
        timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.THURSDAY,
        timeToMinuteOffset(18),
        timeToMinuteOffset(20),
        "STA247"
    ),
    new Meeting(
        Day.FRIDAY,
        timeToMinuteOffset(12),
        timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.FRIDAY,
        timeToMinuteOffset(10),
        timeToMinuteOffset(11),
        "CSC258"
    ),
]
