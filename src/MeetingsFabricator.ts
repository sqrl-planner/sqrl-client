import {
    MeetingDeliveryMode,
    MeetingCategoryType,
    Meeting,
} from "./components/timetable/Meeting"
import { StandardCourse } from "./Course"
import { UserMeeting } from "./SqrlContext"
import { Day, timeToMinuteOffset } from "./utils/time"

const standardMeetingDays = {
    MO: Day.MONDAY,
    TU: Day.TUESDAY,
    WE: Day.WEDNESDAY,
    TH: Day.THURSDAY,
    FR: Day.FRIDAY,
}

const standardMeetingDeliveryMode = {
    ONLSYNC: MeetingDeliveryMode.OnlineSync,
    ONLASYNC: MeetingDeliveryMode.OnlineAsync,
    CLASS: MeetingDeliveryMode.InPerson,
}

const standardMeetingCategoryType = {
    TUT: MeetingCategoryType.Tutorial,
    LEC: MeetingCategoryType.Lecture,
    PRA: MeetingCategoryType.Practical,
}

/**
 * Generate an array of Meetings from a list of courses
 * @param courses An array of StandardCourse
 * @param userMeetings Object of key: course identifier, value: UserMeeting
 * @param section The semester
 * @returns An array of Meeting type
 */
const MeetingsFabricator = (
    courses: StandardCourse[],
    userMeetings: { [key: string]: UserMeeting },
    section: StandardCourse["section"]
): Meeting[] => {
    let meetings: Meeting[] = []

    for (const [index, course] of courses.entries()) {
        if (
            course.section !== section &&
            section !== "Y" &&
            course.section !== "Y"
        )
            continue
        for (const [userCourse, userMeeting] of Object.entries(userMeetings)) {
            if (course.courseId !== userCourse) continue

            for (const meetingName of Object.values(userMeeting)) {
                const meeting = course.meetings[meetingName]
                for (const schedule of Object.values(meeting.schedule)) {
                    const day = standardMeetingDays[schedule.meetingDay]
                    // TODO Handle case where meetingStartTime is null
                    const startTime = schedule.meetingStartTime
                        .split(":")
                        .map((time) => parseInt(time))
                    const endTime = schedule.meetingEndTime
                        .split(":")
                        .map((time) => parseInt(time))

                    meetings.push(
                        new Meeting(
                            day,
                            timeToMinuteOffset(startTime[0], startTime[1]),
                            timeToMinuteOffset(endTime[0], endTime[1]),
                            course.code,
                            index + 1,
                            standardMeetingDeliveryMode[meeting.deliveryMode],
                            standardMeetingCategoryType[meeting.teachingMethod],
                            meeting.sectionNumber
                        )
                    )
                }
            }
        }
    }

    return meetings
}

export default MeetingsFabricator
