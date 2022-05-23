import { MeetingCategoryType } from "../../components/timetable/Meeting"
import { Course } from "../Course"
import { AppData } from "../SqrlContext"

export const breakdownCourseCode = (title: string) => {
    const firstDigitContent = title.match(/\d{3,}/g)
    let firstDigit = 0

    if (firstDigitContent) firstDigit = title.indexOf(firstDigitContent[0])

    const department = title.substring(0, firstDigit)
    const numeral = firstDigitContent
        ? title.substr(firstDigit, firstDigitContent[0].length)
        : title

    const suffix = firstDigitContent
        ? title.substring(firstDigitContent[0].length + department.length)
        : ""

    return { department, numeral, suffix }
}

export const breakdownCourseIdentifier = (identifier: string) => {
    const brokenIdentifier = identifier.split("-")

    return {
        ...breakdownCourseCode(brokenIdentifier[0]),
        term: brokenIdentifier[1],
        terminal: brokenIdentifier[2],
    }
}

export const getMeetingTypes = (course: Course) => ({
    lecture: course.sections.some(
        (section) => section.teachingMethod === "LECTURE"
    ),
    tutorial: course.sections.some(
        (section) => section.teachingMethod === "TUTORIAL"
    ),
    practical: course.sections.some(
        (section) => section.teachingMethod === "PRACTICAL"
    ),
})

export const meetingsMissing = (
    course: Course,
    userMeetings: AppData["userMeetings"],
    identifier: string
) => {
    const courseMeetingTypes = getMeetingTypes(course)

    let missing: Array<MeetingCategoryType> = []

    for (const [meetingType, meetingTypeExists] of Object.entries(
        courseMeetingTypes
    )) {
        if (!meetingTypeExists) continue

        if (!userMeetings[identifier][meetingType as MeetingCategoryType]) {
            missing.push(meetingType as MeetingCategoryType)
        }
    }

    return missing
}
