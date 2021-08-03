import { Day, timeToMinuteOffset } from "../../utils/time"

/**
 * The delivery mode for a meeting.
 */
export enum MeetingDeliveryMode {
    OnlineAsync = "online asynchronous",
    OnlineSync = "online synchronous",
    InPerson = "in person",
}

/**
 * The type of meeting category.
 */
export enum MeetingCategoryType {
    Tutorial = "tutorial",
    Lecture = "lecture",
    Practical = "practical",
}

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
    /**
     * The enumerated key of the meeting parent, i.e. course
     */
    courseKey: number
    /**
     * Delivery method
     */
    delivery: MeetingDeliveryMode
    /**
     * Meeting category
     */
    category: MeetingCategoryType
    /**
     * Meeting section
     */
    section: string | null

    constructor(
        day: Day,
        startTime: number,
        endTime: number,
        title: string = "Untitled meeting",
        courseKey: number = 0,
        delivery: MeetingDeliveryMode = MeetingDeliveryMode.InPerson,
        category: MeetingCategoryType = MeetingCategoryType.Lecture,
        section: string | null = null
    ) {
        this.day = day
        this.startTime = startTime
        this.endTime = endTime
        this.title = title
        this.courseKey = courseKey
        this.delivery = delivery
        this.category = category
        this.section = section
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
 * A group of meetings.
 */
export class MeetingGroup {
    /**
     * The meetings in this group.
     */
    meetings: Meeting[]

    constructor(meetings: Meeting[]) {
        this.meetings = meetings
    }

    /**
     * Get the earliest start time of the meetings in this group, given in minutes from midnight.
     * @returns The minimum start time, given in minutes from midnight.
     */
    getMinStartTime(): number {
        let minStartTime = Infinity
        for (const meeting of this.meetings) {
            minStartTime = Math.min(minStartTime, meeting.startTime)
        }
        return minStartTime
    }

    /**
     * Get the latest end time of the meetings in this group.
     * @returns The maximum end time, given in minutes from midnight.
     */
    getMaxEndTime(): number {
        let maxEndTime = -Infinity
        for (const meeting of this.meetings) {
            maxEndTime = Math.max(maxEndTime, meeting.endTime)
        }
        return maxEndTime
    }

    /**
     * Partition an array of meetings into groups such that each group contains a set of contiguous
     * and possibly overlapping meetings.
     * @param meetings The array of meetings to partition.
     * @returns An array of MeetingGroup objects.
     */
    static partition(meetings: Meeting[]): MeetingGroup[] {
        // Make sure there is at least one meeting!
        if (meetings.length === 0) {
            return new Array(0)
        }
        // Sort in increasing order of start time
        // Copy the original array to avoid mutating it
        meetings = [...meetings].sort((a: any, b: any) =>
            a.startTime >= b.startTime ? 1 : -1
        )
        // Merge overlapping meetings
        const currentGroups = [new MeetingGroup([meetings[0]])]
        for (let i = 1; i < meetings.length; i++) {
            const group = currentGroups[currentGroups.length - 1]
            const groupEndTime = group.getMaxEndTime()
            if (groupEndTime <= meetings[i].startTime) {
                currentGroups.push(new MeetingGroup([meetings[i]]))
            } else {
                group.meetings.push(meetings[i])
            }
        }
        return currentGroups
    }
}
