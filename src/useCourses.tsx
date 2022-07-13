// Fetch courses given sections

import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_COURSES_BY_ID } from "../operations/queries/getCoursesById"
import { Course } from "./Course"
import { useAppContext, UserMeeting } from "./SqrlContext"
import { getMeetingsFromSections } from "./utils/course"

type Props = {
  sections: { [key: string]: Array<string> }
}

// Create user meetings
const useCourses = ({ sections }: Props) => {
  const [courses, setCourses] = useState<{ [key: string]: Course }>({})
  const [userMeetings, setUserMeetings] = useState<{
    [key: string]: UserMeeting
  }>({})

  const {
    state: { sidebarCourse },
  } = useAppContext()

  const [getCoursesById, { loading, error, data }] = useLazyQuery(
    GET_COURSES_BY_ID,
    {
      errorPolicy: "all",
    }
  )

  useEffect(() => {
    if (!sections) return
    const coursesToGet = Object.keys(sections)
    if (sidebarCourse) coursesToGet.push(sidebarCourse)

    getCoursesById({
      variables: {
        ids: coursesToGet,
      },
    })
  }, [getCoursesById, sections, sidebarCourse])

  useEffect(() => {
    if (!data || !data.coursesById) return
    if (error) return
    const coursesToBeSet: { [key: string]: Course } = {}

    for (const course of data.coursesById) {
      if (!course) continue
      coursesToBeSet[course.id] = course
    }

    setCourses(coursesToBeSet)
  }, [data, error])

  useEffect(() => {
    if (!courses || !sections) return

    const userMeetingsToBeSet: { [key: string]: UserMeeting } = {}

    for (const [courseId, meetings] of Object.entries(sections)) {
      userMeetingsToBeSet[courseId] = getMeetingsFromSections(meetings)
    }

    setUserMeetings(userMeetingsToBeSet)
  }, [courses, sections])

  return {
    courses,
    loading,
    userMeetings,
  }
}

export default useCourses
