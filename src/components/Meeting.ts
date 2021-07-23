export enum Day {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    // SATURDAY = 'Saturday',
    // SUNDAY = 'Sunday'
}

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

    getTimeBounds(): [number, number] {
        return [this.startTime, this.endTime]
    }

    /**
     * Convert a HH:MM time to minutes from midnight.
     * @param hour Hour component of time
     * @param minute Minute component of time
     * @returns The time given as an offset in minutes from midnight.
     */
    static timeToMinuteOffset(
        hour: number,
        minute: number = 0,
        resolution: number = 15
    ): number {
        minute = Math.min(Math.round(minute / resolution) * resolution, 60)
        return hour * 60 + minute
    }

    static minuteOffsetToTime(time: number): string {
        const hour = Math.floor(time / 60)
        const minute = time % 60
        return (
            hour.toString().padStart(2, "0") +
            ":" +
            minute.toString().padStart(2, "0")
        )
    }

    // static timeToMinuteOffset2(h: any, m: any, resolution: any = 15) {
    //    (Math.round(minute / resolution) * resolution) % 60
    // }
}

// Sample data
export const meetings = [
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "CSC258"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(13),
        Meeting.timeToMinuteOffset(14),
        "Fake course"
    ),
    // begin conflicting time
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(14),
        Meeting.timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(17),
        "STA247"
    ),
    // end conflicting time
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "MAT237"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(21),
        "CSC258"
    ),
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "CSC258"
    ),
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12),
        "MAT237"
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(16),
        "CSC207"
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(20),
        "STA247"
    ),
    new Meeting(
        Day.FRIDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "CSC236"
    ),
    new Meeting(
        Day.FRIDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "CSC258"
    ),
]
