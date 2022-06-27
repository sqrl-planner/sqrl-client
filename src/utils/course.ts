import { MeetingCategoryType } from "../../components/timetable/Meeting"
import { Course } from "../Course"
import { UserMeeting } from "../SqrlContext"

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

export const getMeetingsFromSections = (sections: Array<string>) => {
  return {
    lecture: sections.find((section) => section.toLowerCase().includes("lec")),
    tutorial: sections.find((section) => section.toLowerCase().includes("tut")),
    practical: sections.find((section) =>
      section.toLowerCase().includes("pra")
    ),
  }
}

export const constructSectionsFromMeetings = ({
  lecture,
  tutorial,
  practical,
}: {
  lecture?: string
  tutorial?: string
  practical?: string
}) => {
  return [
    ...(lecture ? [lecture] : []),
    ...(tutorial ? [tutorial] : []),
    ...(practical ? [practical] : []),
  ]
}

export const getSectionType = (section: string) => {
  const normalizedSection = section.toLowerCase()
  switch (true) {
    case normalizedSection.includes("lec"):
      return "lecture"
    case normalizedSection.includes("tut"):
      return "tutorial"
    case normalizedSection.includes("pra"):
      return "practical"
    default:
      throw new Error("Not a recognized section.")
  }
}

export const getMeetingTypes = (course: Course) => ({
  lecture: course?.sections.some(
    (section) => section.teachingMethod === "LECTURE"
  ),
  tutorial: course?.sections.some(
    (section) => section.teachingMethod === "TUTORIAL"
  ),
  practical: course?.sections.some(
    (section) => section.teachingMethod === "PRACTICAL"
  ),
})

export const meetingsMissing = (
  course: Course,
  userMeetings: { [key: string]: UserMeeting },
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

export const courseIsForCredit = (course: Course) => {
  if (course?.description.includes("does not carry credit weight")) return false
  return true
}
