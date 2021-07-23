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

    // static timeToMinuteOffset2(h: any, m: any, resolution: any = 15) {
    //    (Math.round(minute / resolution) * resolution) % 60
    // }
}

// Sample data
export const meetings = [
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(8),
        Meeting.timeToMinuteOffset(11),
        "conflict eh"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "conflict alpha"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12),
        "MAT238"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "MAT239"
    ),
    // begin conflicting time
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(14),
        Meeting.timeToMinuteOffset(16),
        "conflict 1"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(17),
        "conflict i"
    ),
    // new Meeting(
    //     Day.MONDAY,
    //     Meeting.timeToMinuteOffset(15),
    //     Meeting.timeToMinuteOffset(17),
    //     "same conflict i"
    // ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(16),
        Meeting.timeToMinuteOffset(21),
        "conflict I"
    ),
    new Meeting(
        Day.MONDAY,
        Meeting.timeToMinuteOffset(20),
        Meeting.timeToMinuteOffset(22),
        "conflict I"
    ),
    // new Meeting(
    //     Day.MONDAY,
    //     Meeting.timeToMinuteOffset(16),
    //     Meeting.timeToMinuteOffset(19),
    //     "CONFLICT\nJDJFKASDJFDASJKLDFS"
    // ),
    // end conflicting time
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(11),
        Meeting.timeToMinuteOffset(12),
        "Titled meeting"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(13),
        "David Liu"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(15),
        Meeting.timeToMinuteOffset(16),
        "Davi Liu"
    ),
    // begin conflict
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(21),
        "conflict 2"
    ),
    new Meeting(
        Day.TUESDAY,
        Meeting.timeToMinuteOffset(18),
        Meeting.timeToMinuteOffset(21),
        "conflict II"
    ),
    // end conflict
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(10),
        Meeting.timeToMinuteOffset(11),
        "MAT247"
    ),
    // begin conflict
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(12),
        Meeting.timeToMinuteOffset(15),
        "conflict 3"
    ),
    new Meeting(
        Day.WEDNESDAY,
        Meeting.timeToMinuteOffset(14),
        Meeting.timeToMinuteOffset(22),
        "conflict III"
    ),
    // end conflict
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
