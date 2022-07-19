import { useLazyQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { REMOVE_COURSE_TIMETABLE } from "../operations/mutations/removeCourseTimetable"
import { SET_SECTIONS_TIMETABLE } from "../operations/mutations/setSectionsTimetable"
import { GET_TIMETABLE_BY_ID } from "../operations/queries/getTimetableById"
import { SET_TIMETABLE_NAME } from "../operations/mutations/setTimetableName"

import useTimetable from "./useTimetable"
import {
  constructSectionsFromMeetings,
  getMeetingsFromSections,
  getSectionType,
} from "./utils/course"

type SetTimetableSectionsProps = {
  courseId: string
  sections: Array<string>
}

type RemoveTimetableCourseProps = {
  courseId: string
}

type SectionsContextContent = {
  sections: { [key: string]: Array<string> }
  name: string
  updateName: Function
  setSections: Function
  removeCourse: Function
}

const SectionsContext = createContext<SectionsContextContent | undefined>(
  undefined
)

export const SectionsProvider = ({
  children,
  initialSections = {},
}: {
  children: React.ReactNode
  initialSections?: { [key: string]: Array<string> }
}) => {
  const router = useRouter()

  const id = (router.query.id as string) || ""

  const [getTimetableById, { data }] = useLazyQuery(GET_TIMETABLE_BY_ID, {
    fetchPolicy: "no-cache",
  })

  const [sections, setSections] = useState<{ [key: string]: Array<string> }>(
    initialSections
  )
  const [name, setName] = useState<string>("")

  const { key } = useTimetable({ id })

  useEffect(() => {
    if (!id) return

    getTimetableById({
      variables: {
        id,
      },
    })
  }, [id])

  useEffect(() => {
    if (!data) return
    if (!id) return

    setSections(JSON.parse(data.timetableById.sections))
    setName(data.timetableById.name)
  }, [data, id])

  const [setSectionsTimetable] = useMutation(SET_SECTIONS_TIMETABLE)
  const [setTimetableName] = useMutation(SET_TIMETABLE_NAME)
  const [removeCourse] = useMutation(REMOVE_COURSE_TIMETABLE)

  const removeTimetableCourse = ({ courseId }: RemoveTimetableCourseProps) => {
    removeCourse({
      variables: { id, courseId, key },
      onCompleted: (data) => {
        setSections(JSON.parse(data.removeCourseTimetable.timetable.sections))
      },
    })
  }

  const setTimetableSections = ({
    courseId,
    sections: nextSections,
  }: SetTimetableSectionsProps) => {
    if (!id) return

    setSections((prevSections) => {
      const meetings = getMeetingsFromSections(prevSections[courseId] || [])
      for (const nextSection of nextSections) {
        const sectionType = getSectionType(nextSection)
        meetings[sectionType] = nextSection
      }

      return {
        ...prevSections,
        [courseId]: constructSectionsFromMeetings(meetings),
      }
    })

    setSectionsTimetable({
      variables: {
        id,
        courseId,
        key,
        sections: nextSections,
      },
      onCompleted: (data) => {
        setSections(JSON.parse(data.setSectionsTimetable.timetable.sections))
      },
    })
  }

  const updateName = (name: string, cb?: Function) => {
    if (!key) return
    if (!id) return

    // Set the name in the client (contexts)
    setName(name)

    // Set the new name in LS (persistence)
    setTimetableName({
      variables: { id, key, name },
      onCompleted: (data) => {
        const prevLsTimetablesJSON = localStorage.getItem("timetables")
        let prevLsTimetables: { [key: string]: { key: string; name: string } } =
          {}
        if (prevLsTimetablesJSON)
          prevLsTimetables = JSON.parse(prevLsTimetablesJSON)

        prevLsTimetables[id].name = data.setTimetableName.timetable.name

        localStorage.setItem("timetables", JSON.stringify(prevLsTimetables))

        if (cb) cb()
      },
    })
  }

  return (
    <SectionsContext.Provider
      value={{
        sections,
        name,
        updateName,
        setSections: setTimetableSections,
        removeCourse: removeTimetableCourse,
      }}
    >
      {children}
    </SectionsContext.Provider>
  )
}

const useSections = () => {
  const context = useContext(SectionsContext)

  if (context === undefined) {
    throw new Error("useSectionsContext must be used within a SectionsProvider")
  }

  return context
}

export default useSections
