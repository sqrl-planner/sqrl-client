import { Day } from "../../src/utils/time"

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
    Lecture = "lecture",
    Tutorial = "tutorial",
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
    /**
     * Course identifier
     */
    identifier: string

    constructor(
        day: Day,
        startTime: number,
        endTime: number,
        title: string = "Untitled meeting",
        courseKey: number = 0,
        delivery: MeetingDeliveryMode = MeetingDeliveryMode.InPerson,
        category: MeetingCategoryType = MeetingCategoryType.Lecture,
        section: string | null = null,
        identifier: string
    ) {
        this.day = day
        this.startTime = startTime
        this.endTime = endTime
        this.title = title
        this.courseKey = courseKey
        this.delivery = delivery
        this.category = category
        this.section = section
        this.identifier = identifier
    }

    /**
     * Get the time bounds of this meeting.
     * @returns An array containing two numbers: the start and end time.
     */
    getTimeBounds(): [number, number] {
        return [this.startTime, this.endTime]
    }

    getUniqueKey(): string {
        return `${this.identifier}-${this.category}-${this.section}`
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
     * @remarks This IGNORES the day of the meeting.
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
     * @remarks This IGNORES the day of the meeting.
     */
    getMaxEndTime(): number {
        let maxEndTime = -Infinity
        for (const meeting of this.meetings) {
            maxEndTime = Math.max(maxEndTime, meeting.endTime)
        }
        return maxEndTime
    }

    /**
     * Return whether this meeting group contains a conflict.
     * @returns A boolean indicating whether this meeting group contains a conflict.
     * @remarks A meeting A is a conflict iff it overlaps with another meeting B, and A and B
     * occur on the same day.
     */
    hasConflict(): boolean {
        // Sort in increasing order of start time
        // Copy the original array to avoid mutating it
        const meetings = [...this.meetings].sort((a: any, b: any) =>
            a.startTime >= b.startTime ? 1 : -1
        )
        for (let i = 1; i < meetings.length; i++) {
            const meetingA = meetings[i - 1]
            const meetingB = meetings[i]
            // Check overlap
            if (
                meetingA.day === meetingB.day &&
                meetingA.endTime > meetingB.startTime
            ) {
                return true
            }
        }
        // No overlap
        return false
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

/**
 * Partition an array of meetings into groups organized by day.
 * @returns A Map mapping days to MeetingGroup objects.
 */
export const partitionMeetingsByDay = (
    meetings: Meeting[],
    days?: Array<Day> | undefined
): Map<Day, MeetingGroup[]> => {
    const meetingsMap = new Map()
    for (const meeting of meetings) {
        if (!meetingsMap.has(meeting.day)) {
            meetingsMap.set(meeting.day, [])
        }
        meetingsMap.get(meeting.day).push(meeting)
    }

    const groupsMap = new Map()
    const allDays = !days ? Array.from(meetingsMap.keys()) : days
    for (const day of allDays) {
        if (meetingsMap.has(day)) {
            groupsMap.set(day, MeetingGroup.partition(meetingsMap.get(day)))
        } else {
            groupsMap.set(day, [])
        }
    }
    return groupsMap
}
