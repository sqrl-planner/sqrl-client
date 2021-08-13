import {
    Meeting,
    MeetingCategoryType,
    MeetingDeliveryMode,
} from "./components/timetable/Meeting"
import { Course } from "./Course"
import { UserMeeting } from "./SqrlContext"
import { Day, timeToMinuteOffset } from "./utils/time"

const standardMeetingDays = {
    MONDAY: Day.MONDAY,
    TUESDAY: Day.TUESDAY,
    WEDNESDAY: Day.WEDNESDAY,
    THURSDAY: Day.THURSDAY,
    FRIDAY: Day.FRIDAY,
}

const standardMeetingDeliveryMode = {
    ONLSYNC: MeetingDeliveryMode.OnlineSync,
    ONLASYNC: MeetingDeliveryMode.OnlineAsync,
    CLASS: MeetingDeliveryMode.InPerson,
}

const standardMeetingCategoryType = {
    TUTORIAL: MeetingCategoryType.Tutorial,
    LECTURE: MeetingCategoryType.Lecture,
    PRACTICAL: MeetingCategoryType.Practical,
}

/**
 * Generate an array of Meetings from a list of courses
 * @param courses Object of StandardCourse
 * @param userMeetings Object of key: course identifier, value: UserMeeting
 * @param section The semester
 * @returns An array of Meeting type
 */
const MeetingsFabricator = (
    courses: { [key: string]: Course },
    userMeetings: { [key: string]: UserMeeting },
    term: "FULL_YEAR" | "FIRST_SEMESTER" | "SECOND_SEMESTER"
): Meeting[] => {
    let meetings: Meeting[] = []
    let index = 0

    for (const [userCourse, userMeeting] of Object.entries(userMeetings)) {
        index++
        for (const [identifier, course] of Object.entries(courses)) {
            if (identifier !== userCourse) continue
            if (
                course.term !== term &&
                term !== "FULL_YEAR" &&
                course.term !== "FULL_YEAR"
            ) {
                continue
            }
            // if (Object.keys(userMeeting).length) index++

            for (const meetingName of Object.values(userMeeting)) {
                const meeting = course.sections.filter(
                    (section: any) => section.code === meetingName
                )[0]

                for (const schedule of meeting.meetings as any) {
                    const day =
                        standardMeetingDays[
                            schedule.day as
                                | "MONDAY"
                                | "TUESDAY"
                                | "WEDNESDAY"
                                | "THURSDAY"
                                | "FRIDAY"
                        ]

                    meetings.push(
                        new Meeting(
                            day,
                            timeToMinuteOffset(
                                schedule.startTime.hour,
                                schedule.startTime.minute
                            ),
                            timeToMinuteOffset(
                                schedule.endTime.hour,
                                schedule.endTime.minute
                            ),
                            course.code as string | undefined,
                            index,
                            standardMeetingDeliveryMode[
                                meeting.deliveryMode as
                                    | "CLASS"
                                    | "ONLSYNC"
                                    | "ONLASYNC"
                            ],
                            standardMeetingCategoryType[
                                meeting.teachingMethod as
                                    | "LECTURE"
                                    | "TUTORIAL"
                                    | "PRACTICAL"
                            ],
                            meeting.sectionNumber,
                            identifier
                        )
                    )
                }
            }
        }
    }

    return meetings
}

export default MeetingsFabricator
