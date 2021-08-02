export interface Schedule {
    [key: string]: {
        meetingDay: "MO" | "TU" | "WE" | "TH" | "FR"
        meetingStartTime: string
        meetingEndTime: string
        meetingScheduleId: string
        assignedRoom1?: string
        assignedRoom2: string | null
    }
}

export interface Instructors {
    [key: string]: {
        instructorId: string
        firstName: string
        lastName: string
    }
}

export interface StandardMeeting {
    schedule: Schedule | Array<never>
    instructors: Instructors | Array<never>
    meetingId: string
    teachingMethod: "LEC" | "TUT" | "PRA"
    sectionNumber: string
    subtitle: string
    cancel: string
    waitlist: string
    deliveryMode: "ONLSYNC" | "ONLASYNC" | "CLASS"
    online?: string
    enrollmentCapacity: string
    actualEnrolment: string
    actualWaitlist: string
    enrollmentIndicator: string | null
    meetingStatusNotes: string | null
    enrollmentControls: Array<any>
}

interface StandardMeetings {
    [key: string]: StandardMeeting
}

/**
 * A class representing a course
 */
export interface Course {
    courseId: string
    org: string
    orgName: string
    courseTitle: string
    code: string
    courseDescription: string
    prerequisite: string
    corequisite: string
    exclusion: string
    recommendedPreparation: string
    section: "F" | "S" | "Y"
    session: string
    webTimetableInstructions: string
    deliveryInstructions: string
    breadthCategories: string
    distributionCategories: string
    meetings: StandardMeetings
}
