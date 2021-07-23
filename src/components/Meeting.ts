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
        minute = (Math.round(minute / resolution) * resolution) % 60
        return hour * 60 + minute
    }
}

// Sample data
export const meetings = [
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "MAT237"
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
        "MAT237"
    ),
    // new Meeting(Day.MONDAY, Meeting.timeToMinuteOffset(14), Meeting.timeToMinuteOffset(16)), // conflicting time
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(17),
        "MATNut"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12)
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13)
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(16)
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(21)
    ),
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11)
    ),
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13)
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12)
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(16)
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(20)
    ),
    new Meeting(
        Day.THURSDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(20)
    ),
    new Meeting(
        Day.FRIDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11)
    ),
    new Meeting(
        Day.FRIDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13)
    ),
]
