import {
    MeetingDeliveryMode,
    MeetingCategoryType,
    Meeting,
} from "./components/timetable/Meeting"
import { Course } from "./Course"
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
}

const MeetingsFabricator = (
    courses: Course[],
    userMeetings: { [key: string]: UserMeeting }
): Meeting[] => {
    let meetings: Meeting[] = []

    for (const [index, course] of courses.entries()) {
        for (const [userCourse, userMeeting] of Object.entries(userMeetings)) {
            console.log(course.code, userCourse)
            if (course.courseId !== userCourse) continue

            for (const [meetingType, meetingName] of Object.entries(
                userMeeting
            )) {
                const meeting = course.meetings[meetingName]
                // meetings.push(new Meeting(
                // ))
                for (const [, schedule] of Object.entries(
                    course.meetings[meetingName].schedule
                )) {
                    // console.log(schedule)
                    const day =
                        standardMeetingDays[
                            schedule.meetingDay as
                                | "MO"
                                | "TU"
                                | "WE"
                                | "TH"
                                | "FR"
                        ]
                    // TODO Handle case where meetingStartTime is null
                    const startTime = schedule.meetingStartTime.split(":")
                    const endTime = schedule.meetingEndTime.split(":")

                    meetings.push(
                        new Meeting(
                            day,
                            timeToMinuteOffset(
                                parseInt(startTime[0]),
                                parseInt(startTime[1])
                            ),
                            timeToMinuteOffset(
                                parseInt(endTime[0]),
                                parseInt(endTime[1])
                            ),
                            course.code,
                            index + 1,
                            standardMeetingDeliveryMode[
                                meeting.deliveryMode as
                                    | "ONLSYNC"
                                    | "ONLASYNC"
                                    | "CLASS"
                            ],
                            standardMeetingCategoryType[
                                meeting.teachingMethod as "TUT" | "LEC"
                            ],
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
